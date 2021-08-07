import { GraphQLResolvers, ResolverContext } from '../../../http';
import { compare, hash } from 'bcrypt';
import { fetchProfileByEmail, fetchProfileByIdentity, fetchProfileByUsername, generateUsername } from '../fetchers/profile';

import { ApiError, MissingSessionError } from '../../../util/errors';
import { User } from '../../../models/user';
import { logger } from '../../..';

/**
 * Sign in the session 
 * 
 * @param ctx The context
 * @param remember Remember session
 * @param user The user details
 */
function sessionSignIn(ctx: ResolverContext, remember: boolean, user: User) {
	ctx.req.session.userId = user.id;

	if(remember) {
		ctx.req.session.cookie.maxAge = 2628000000;
	}
}

export default {
	register: async (_, { details }, ctx) => {
		const existing = await fetchProfileByEmail(details.email);

		if(existing) {
			throw new ApiError('email-exists');
		}

		// Generate a unique username
		let username = '';
		let counter = 0;

		do {
			username = generateUsername(details.email) + (counter || '');
			counter++;
		} while(await fetchProfileByUsername(username));

		// Hash the provided password
		const password = await hash(details.password, 7);
		const user = new User();

		user.username = username;
		user.name = details.fullname;
		user.email = details.email;
		user.password = password;
		user.role = 'guest';
		user.language = 'en-US';
		user.createdAt = new Date();
		user.lastSeenAt = new Date();
		user.isEnabled = true;
		user.isVerified = false;

		// Save the profile to the database
		const saved = await user.save();

		sessionSignIn(ctx, details.remember, user);
		logger.info(`Registered new user ${details.username}`);
		return saved;
	},
	authenticate: async (_, { details }, ctx) => {
		if(!details.identity || !details.password) {
			throw new ApiError('invalid-request');
		}

		logger.debug(`Authenticating ${details.identity}`);
		
		// Find the user profile
		const user = await fetchProfileByIdentity(details.identity);

		if(!user) {
			logger.debug(`Identity not found`);
			return;
		}

		// Compare hashed passwords
		const valid = await compare(details.password, user.password);

		if(!valid) {
			logger.debug(`Password missmatch`);
			return;
		}

		sessionSignIn(ctx, details.remember, user);
		logger.info(`Authenticated ${user.username}`);
		return user;
	},
	updateProfile: async (_, { details }, ctx) => {
		
		if(!ctx.user) {
			throw new MissingSessionError();
		}
		
		if(details.fullname) {
			ctx.user.name = details.fullname;
		}

		if(details.email) {
			ctx.user.email = details.email;
		}

		if(details.username) {
			ctx.user.username = details.username;
		}

		if(details.bio) {
			//ctx.user.bio = details.bio;
		}

		if(details.website) {
			//ctx.user.website = details.website;
		}

		await ctx.user.save();
	},
	signOut: async (_, _args, ctx) => {
		return new Promise((resolve) => {
			ctx.req.session.destroy(resolve);
		});
	}
} as GraphQLResolvers;