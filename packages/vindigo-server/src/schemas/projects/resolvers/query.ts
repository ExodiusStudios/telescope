import { MissingSessionError, NotImplementedError } from "../../../util/errors";

import { GraphQLResolvers } from "../../../http";
import { Prisma } from "@prisma/client";
import { database } from "../../..";
import { fetchProjectById } from "../fetchers/project";
import { fetchTaskById } from "../fetchers/task";
import { parseTakeSize } from "../../../util/http";

export default {
	projects: async (_, { mode, skip, take }, ctx) => {
		let filter: Prisma.ProjectWhereInput;

		switch(mode) {
			case 'OWNING': {
				if(!ctx.user) {
					throw new MissingSessionError();
				}

				filter = {
					creatorId: ctx.user.id
				};

				break;
			}
			case 'ACCESS': {
				if(!ctx.user) {
					throw new MissingSessionError();
				}

				filter = {
					members: {
						some: {
							member: ctx.user
						}
					}
				};

				break;
			}
			case 'PUBLIC': {
				filter = {
					isPublic: true
				};
				break;
			}
			case 'STARRED': {
				throw new NotImplementedError();
			}
			default: {
				throw new Error('Unknown list mode');
			}
		}

		return database.project.findMany({
			where: filter,
			skip: skip,
			take: parseTakeSize(take, 50)
		});
	},
	project: async (_, { id }) => {
		return fetchProjectById(id);
	},
	task: async (_, { id }) => {
		return fetchTaskById(id);
	}
} as GraphQLResolvers;