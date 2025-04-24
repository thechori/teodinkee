import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
//
// import { DB } from "./types";
import env from "../config/env.server";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env.PGDATABASE,
    host: env.PGHOST,
    user: env.PGUSER,
    port: parseInt(env.PGPORT),
    max: 10,
    ssl: {
      ca: env.PGCERT,
      rejectUnauthorized: true
    }
  })
});

// TODO: apply type after initial DB introspection
export const db = new Kysely<any>({
  dialect
});
