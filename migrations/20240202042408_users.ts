/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
    return await knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 255);
      table.string('first_name', 255);
      table.string('last_name', 255);
      table.string('email', 255);
      table.string('password', 255);
      table.integer('role').unsigned().references('id').inTable('roles');
      table.boolean('is_active');
      table.boolean('is_delete');
      table.timestamp('updated_at', { useTz: false }).notNullable();
      table.timestamp('created_at', { useTz: false }).notNullable();
  
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    return await knex.schema.dropTable('users');
  };
  