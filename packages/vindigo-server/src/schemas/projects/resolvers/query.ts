import { MissingSessionError, NoPermissionError, NotImplementedError } from "../../../util/errors";

import { GraphQLResolvers } from "../../../http";
import { Prisma } from "@prisma/client";
import { database } from "../../..";
import { checkAccess, fetchProjectById } from "../fetchers/project";
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
	project: async (_, { id }, ctx) => {
		const project = await fetchProjectById(id);

		if(project && !checkAccess(project, ctx.user)) {
			throw new NoPermissionError();
		}

		return project;
	},
	task: async (_, { id }, ctx) => {
		const task = await database.task.findUnique({
			where: { id },
			include: {
				project: true
			}
		});

		if(task && !checkAccess(task.project, ctx.user)) {
			throw new NoPermissionError();
		}

		return task;
	}
} as GraphQLResolvers;