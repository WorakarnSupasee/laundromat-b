import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('roles').del();

  // Inserts seed entries
  await knex('roles').insert([
    {
      role_name: 'Admin',
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
        role_name: 'User',
        is_active: true,
        is_delete: false,
        updated_at: new Date(),
        created_at: new Date(),
      },
  ]);
}
