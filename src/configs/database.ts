import { knex } from "knex";

const knexfile = {
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
}
    
export const database = knex(knexfile.development)
