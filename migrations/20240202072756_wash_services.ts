/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return await knex.schema.createTable('wash_service', function (table) {
    table.increments('id').primary();
    table
      .integer('washing_machine', 255)
      .unsigned()
      .references('id')
      .inTable('washing_machines');
    table.string('wash_program_tempeture', 255);
    table.string('wash_program_program', 255);
    table.boolean('is_complete', 255);
    table.timestamp('start_time');
    table.timestamp('finish_time');
    table.integer('used_by', 255).unsigned().references('id').inTable('users');
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
  return await knex.schema.dropTable('wash_service');
};
