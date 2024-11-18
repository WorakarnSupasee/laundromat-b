import { knex, type Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '1234',
      database: 'laundromat',
    },
  },

};

module.exports = config;
