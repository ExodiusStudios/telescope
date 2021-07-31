import { database, logger } from "..";

import { Project } from "../models/project";
import { ProjectMember } from "../models/projectMember";
import { ProjectTeam } from "../models/projectTeam";
import { Session } from "../models/session";
import { Task } from "../models/task";
import { Team } from "../models/team";
import { User } from "../models/user";

/**
 * Define all database models
 */
export function registerModels() {
	logger.info(`Loading database models`);
	
	database.defineModel(User);
	database.defineModel(Session);
	database.defineModel(Project);
	database.defineModel(Task);
	database.defineModel(Team);
	database.defineModel(ProjectMember);
	database.defineModel(ProjectTeam);
}