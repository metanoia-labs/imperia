import { container } from "@sapphire/framework";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env["DATABASE_URL"] as string,
});

export const db = drizzle(pool);

async function main() {
    if (process.env["NODE_ENV"] !== "production") {
        container.logger.info("Migrating database...");
        await migrate(db, { migrationsFolder: "libs/database/drizzle" });
        container.logger.info("Database migrated successfully!");
        return;
    }
}

main().catch((error) => {
    container.logger.error(error);
    process.exit(1);
});
