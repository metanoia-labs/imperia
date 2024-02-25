import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { userWalletsTable } from "./wallet";
import { bankAccountsTable } from "./bank";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("discord_id").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
    wallets: one(userWalletsTable),
    bank_accounts: one(bankAccountsTable),
}));
