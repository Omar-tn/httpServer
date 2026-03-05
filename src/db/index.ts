
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema.js";
import { apiConf } from "../config.js";

const conn = postgres(apiConf.db.dbURL);
export const db = drizzle(conn, { schema });