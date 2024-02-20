import { pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("discord_id").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
