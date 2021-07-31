import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { ProjectMember } from "./projectMember";

@Entity('projects')
export class Project extends BaseEntity {

	@PrimaryColumn()
	public id: number;

	@Column()
	public createdAt: Date;

	@Column()
	public lastModifiedAt: Date;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public coverImage: string;

	@Column()
	public backgroundImage: string;

	@Column()
	public creatorId: number;

	@Column()
	public isVisible: boolean;

	@Column()
	public isClosed: boolean;

	@Column()
	public isPublic: boolean;

	@OneToMany(() => ProjectMember, member => member.project)
	public members: ProjectMember[];

}