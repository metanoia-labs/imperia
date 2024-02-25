import { integer, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const userWalletsTable = pgTable("user_wallets", {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").references(() => usersTable.id),
    balance: integer("balance").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
