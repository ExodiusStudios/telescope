import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Project } from "./project";
import { Team } from "./team";

/**
 * Represents a team invited to a project
 */
@Entity('project_teams')
export class ProjectTeam extends BaseEntity {

	@PrimaryColumn()
	public id: number;

	@ManyToOne(() => Project, project => project.members)
	public project: Project;

	@ManyToOne(() => Team, team => team.projects)
	public team: Team;

	@Column()
	public accessLevel: string;

}