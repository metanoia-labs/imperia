import { db, usersTable } from "@imperia/database";
import { ImperiaIdentifiers } from "@imperia/discord-bot";
import { Precondition } from "@sapphire/framework";
import { CommandInteraction } from "discord.js";
import { eq } from "drizzle-orm";

export class RegisteredUserOnlyPrecondition extends Precondition {
    public constructor(context: Precondition.LoaderContext, options: Precondition.Options) {
        super(context, {
            ...options,
            name: ImperiaIdentifiers.RegisteredUserOnly,
        });
    }

    public async chatInputRun(interaction: CommandInteraction) {
        const userQuery = await db.select().from(usersTable).where(eq(usersTable.discordId, interaction.user.id));
        if (userQuery.length > 0) {
            return this.ok();
        } else {
            return this.error({
                message: "You must be a registered user to use this command.",
                identifier: ImperiaIdentifiers.RegisteredUserOnly,
            });
        }
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        RegisteredUserOnly: never;
    }
}
