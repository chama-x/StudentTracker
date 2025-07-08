import { config } from "dotenv";

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
  config();
}

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create Drizzle instance
export const db = drizzle(pool, { schema });

// Export types
export type Database = typeof db;
export * from "../shared/schema"; 