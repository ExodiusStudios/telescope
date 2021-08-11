import { Nullable } from "../../../typings/types";
import { Task } from "@prisma/client";
import { database } from "../../..";

/**
 * Fetch a task by its unique id
 * 
 * @param id The task id
 * @returns The task, or null
 */
export function fetchTaskById(id: number): Promise<Nullable<Task>> {
	return database.task.findUnique({
		where: { id }
	});
}