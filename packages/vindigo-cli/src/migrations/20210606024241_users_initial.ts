import { Knex } from 'knex';

exports.up = async ({ schema }: Knex) => {
	return schema.createTable('users', (table) => {
		table.increments();
		table.string('username');
		table.string('email');
		table.string('password');
		table.string('avatar');
		table.string('bio');
		table.string('name');
		table.string('role');
		table.string('language');
		table.timestamp('created_at');
		table.timestamp('last_seen_at');
		table.boolean('is_enabled').defaultTo(true);
		table.boolean('is_verified').defaultTo(false);
	});
};

exports.down = async ({ schema }: Knex) => {
	return schema.dropTable('users');
};