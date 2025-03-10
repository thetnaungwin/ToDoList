import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgres://default:hHcYb4kCB9fy@ep-twilight-sound-a1o3q1p9-pooler.ap-southeast-1.aws.neon.tech:5432/ToDoList?sslmode=require?sslmode=require",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
