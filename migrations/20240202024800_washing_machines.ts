/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return await knex.schema.createTable('washing_machines', function (table) {
    table.increments('id').primary();
    table.string('name', 255);
    table.string('color', 255);
    table.string('status', 255);
    table
      .integer('type', 25)
      .unsigned()
      .references('id')
      .inTable('machines_type');
    table.integer('coin');
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
  return await knex.schema.dropTable('washing_machines');
};
