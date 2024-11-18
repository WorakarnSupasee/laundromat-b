import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('machines_type').del();

  // Inserts seed entries
  await knex('machines_type').insert([
    {
      type_name: 'TEST01',
      weight: 40,
      price: 40,
      work_duration: 1,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      type_name: 'Small',
      weight: 25,
      price: 20,
      work_duration: 50,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      type_name: 'Large',
      weight: 50,
      price: 40,
      work_duration: 60,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
  ]);
}
