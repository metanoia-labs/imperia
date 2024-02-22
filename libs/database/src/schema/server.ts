import { pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const serversTable = pgTable("servers", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("server_id").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
