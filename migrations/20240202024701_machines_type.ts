/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return await knex.schema.createTable('machines_type', function (table) {
    table.increments('id').primary();
    table.string('type_name', 255);
    table.integer('weight', 255);
    table.integer('price', 255);
    table.integer('work_duration', 255);
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
  return await knex.schema.dropTable('machines_type');
};
