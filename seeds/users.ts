import { Knex } from 'knex';
import * as argon2 from 'argon2';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'TestAdmin',
      first_name: 'firstname',
      last_name: 'lastname',
      email: 'mail@gmail.com',
      password: await argon2.hash('12345'),
      role: 1,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      username: 'TestUser',
      first_name: 'firstname',
      last_name: 'lastname',
      email: 'mail@gmail.com',
      password: await argon2.hash('12345'),
      role: 2,
      is_active: true,
      is_delete: false,
      updated_at: new Date(),
      created_at: new Date(),
    },
  ]);
}
