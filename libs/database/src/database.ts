import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const client = postgres(process.env["DATABASE_URL"] as string);
export const db = drizzle(client);

if (process.env["NODE_ENV"] !== "production") {
    migrate(db, { migrationsFolder: "libs/database/drizzle" });
}
