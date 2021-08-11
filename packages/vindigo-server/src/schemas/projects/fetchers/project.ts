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
export function fetchProjecOfCreator(id: number, user: User|undefined): Promise<Nullable<Project>> {
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