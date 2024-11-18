import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('washing_machines').del();

  // Inserts seed entries
  await knex('washing_machines').insert([
    {
      name: 'Test01',
      color: 'white',
      status: 1,
      type: 1,
      coin: 5,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      name: 'Large01',
      color: 'white',
      status: 1,
      type: 3,
      coin: 5,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      name: 'Small01',
      color: 'white',
      status: 4,
      type: 2,
      coin: 5,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      name: 'Test01',
      color: 'white',
      status: 1,
      type: 1,
      coin: 5,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
  ]);
}
