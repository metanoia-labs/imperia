import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";
dotenv.config({
    path: "apps/bot/.env",
});

export default {
    schema: "libs/database/src/schema/*.ts",
    out: "libs/database/drizzle",
    driver: "pg",
    breakpoints: true,
    dbCredentials: {
        connectionString: process.env["DATABASE_URL"] as string,
    },
} satisfies Config;
