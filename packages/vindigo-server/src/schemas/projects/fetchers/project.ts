import { Project, User } from "@prisma/client";

import { Nullable } from "../../../typings/types";
import { database } from "../../..";

/**
 * Fetch a project by its unique id
 * 
 * @param id The project id
 * @returns The project, or null
 */
export function fetchProjectById(id: number): Promise<Nullable<Project>> {
	return database.project.findUnique({
		where: { id }
	});
}

/**
 * Fetch a project by its unique id as long as
 * the given user is the creator of the project.
 * 
 * @param id The project id
 * @param user The project creator
 * @returns The project, or null
 */
export function fetchCreatorProject(id: number, user: User|undefined): Promise<Nullable<Project>> {
	if(!user) {
		return Promise.resolve(null);
	}

	return database.project.findFirst({
		where: {
			id: id,
			creator: user
		}
	});
}

/**
 * Check whether the given user has access to
 * the specified project.
 * 
 * @param project The project
 * @param user The user
 * @returns true when user has access
 */
export async function checkAccess(project: Project, user: Nullable<User>): Promise<boolean> {
	if(project.isPublic) {
		return true;
	} else if(!user) {
		return false;
	}

	// Check if user is member of this project
	const isMember = !!await database.projectMember.findFirst({
		where: {
			project: project,
			member: user
		}
	});

	if(isMember) {
		return true;
	}

	// Check if user is member of a participating team
	const isTeamMember = !!await database.projectTeam.findFirst({
		where: {
			project: project,
			team: {
				members: {
					some: {
						member: user
					}
				}
			}
		}
	});

	return isTeamMember;
}