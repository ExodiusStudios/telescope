import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ProjectTeam } from "./projectTeam";
import { User } from "./user";

/**
 * Represents a team of members within vindigo
 */
@Entity('teams')
export class Team extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public createdAt: Date;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public logoImage: string;

	@Column()
	public creatorId: number;

	@ManyToMany(() => User, user => user.teams)
	@JoinTable({
		name: 'team_members',
		joinColumn: { name: 'team_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'member_id', referencedColumnName: 'id' }
	})
	public members: User[];

	@OneToMany(() => ProjectTeam, project => project.team)
	public projects: ProjectTeam[];

}