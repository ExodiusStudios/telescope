import { Knex } from 'knex';

exports.up = async function({schema}: Knex) {
	return schema
	
		// ANCHOR Project table
		.createTable('projects', (table) => {
			table.increments();
			table.string('name');
			table.text('description');
			table.text('readme');
			table.text('readmeHtml');
			table.string('accentColor', 7);
			table.text('coverImage');
			table.text('backgroundImage');
			table.boolean('isVisible');
			table.boolean('isClosed');
			table.boolean('isPublic');
			table.timestamp('createdAt');
			table.timestamp('lastModifiedAt');

			table.integer('creatorId')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onDelete('CASCADE');
		})

		// ANCHOR Teams table
		.createTable('teams', (table) => {
			table.increments();
			table.string('name');
			table.text('description');
			table.string('logoImage');
			table.string('website');
			table.timestamp('createdAt');

			table.integer('creatorId')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onDelete('CASCADE');
		})

		// ANCHOR Tasks table
		.createTable('tasks', (table) => {
			table.increments();
			table.timestamp('createdAt');
			table.timestamp('lastModifiedAt');
			table.string('summary');
			table.text('description');
			table.boolean('isCompleted').defaultTo(false);
			table.boolean('isArchived').defaultTo(false);
			table.dateTime('startTime');
			table.dateTime('endTime');

			table.integer('parentId')
				.unsigned()
				.references('tasks.id')
				.onDelete('SET NULL');
		})

		// ANCHOR Project labels
		.createTable('labels', (table) => {
			table.increments();
			table.string('color');
			table.string('title');
			table.integer('orderNumber');

			table.integer('projectId')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onDelete('CASCADE');
		})

		// ANCHOR Project invited teams table
		.createTable('project_teams', (table) => {
			table.increments();

			table.integer('teamId')
				.unsigned()
				.notNullable()
				.references('teams.id')
				.onDelete('CASCADE');
			
			table.integer('projectId')
				.unsigned()
				.notNullable()
				.references('projects.id')
				.onDelete('CASCADE');
			
			table.string('accessLevel');
		})

		// ANCHOR Project invited members table
		.createTable('project_members', (table) => {
			table.increments();
			
			table.integer('memberId')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onDelete('CASCADE');
			
			table.integer('projectId')
				.unsigned()
				.notNullable()
				.references('projects.id')
				.onDelete('CASCADE');
			
			table.string('accessLevel');
		})

		// ANCHOR Team member join table
		.createTable('team_members', (table) => {
			table.increments();

			table.integer('memberId')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onDelete('CASCADE');
			
			table.integer('teamId')
				.unsigned()
				.notNullable()
				.references('teams.id')
				.onDelete('CASCADE');
		})

		// ANCHOR Task members table
		.createTable('task_members', (table) => {
			table.increments();
			
			table.integer('memberId')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onDelete('CASCADE');
			
			table.integer('taskId')
				.unsigned()
				.notNullable()
				.references('tasks.id')
				.onDelete('CASCADE');
			
			table.timestamp('joinedAt');
		})

		// ANCHOR Task watchers table
		.createTable('task_watchers', (table) => {
			table.increments();
			
			table.integer('memberId')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onDelete('CASCADE');
			
			table.integer('taskId')
				.unsigned()
				.notNullable()
				.references('tasks.id')
				.onDelete('CASCADE');
		})

		// ANCHOR Assigned task labels
		.createTable('task_labels', (table) => {
			table.increments();
			
			table.integer('taskId')
				.unsigned()
				.notNullable()
				.references('tasks.id')
				.onDelete('CASCADE');
			
			table.integer('labelId')
				.unsigned()
				.notNullable()
				.references('labels.id')
				.onDelete('CASCADE');
		});
};

exports.down = async function({schema}: Knex) {
	return schema
		.dropTable('team_members')
		.dropTable('project_members')
		.dropTable('project_teams')
		.dropTable('task_members')
		.dropTable('task_watchers')
		.dropTable('task_labels')
		.dropTable('labels')
		.dropTable('teams')
		.dropTable('tasks')
		.dropTable('projects');
};