import { config, database } from "../../..";
import { fetchProfileById, fetchProfileByUsername } from "../fetchers/profile";

import { GraphQLResolvers } from "../../../http";
import { InvalidArgumentError } from "../../../util/errors";

export interface SearchRequest {
	query: string;
}

export default {
	config: async (_, _args) => {
		const { general, authentication, client } = config;

		return {
			instanceName: general.name,
			maintenance: general.maintenance,
			allowRegister: authentication.registrations,
			allowAnonymous: authentication.anonymous_access,
			verification: authentication.verify_emails,
			colorPalette: client.palette
		};
	},
	profile: async (_, _args, ctx) => {
		const user = ctx.user;

		if(user) {
			database.user.update({
				where: {
					id: user.id
				},
				data: {
					lastSeenAt: new Date()
				}
			});
		}

		return user;
	},
	profileById: async (_, { id }) => {
		return fetchProfileById(id);
	},
	profileByName: async (_, { username }) => {
		return fetchProfileByUsername(username);
	},
	search: async (_, args) => {
		if(args.query.length < 3) {
			throw new InvalidArgumentError('Search query must be at least 3 characters');
		}

		return args;
	}
} as GraphQLResolvers;