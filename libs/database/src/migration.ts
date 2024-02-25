import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

import * as dotenv from "dotenv";
dotenv.config({
    path: "apps/bot/.env",
});

const pool = new Pool({
    connectionString: process.env["DATABASE_URL"] as string,
});

export const db = drizzle(pool);

async function main() {
    if (process.env["NODE_ENV"] !== "production") {
        console.log("Migrating database...");
        await migrate(db, { migrationsFolder: "libs/database/drizzle" });
        console.log("Database migrated successfully!");
        await pool.end();
        return;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
