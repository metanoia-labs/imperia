import { db, userWalletsTable } from "@imperia/database";
import { ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";

export class WalletCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "Wallet",
            description: "View your wallet balance.",
            requiredClientPermissions: ["SendMessages"],
            preconditions: ["RegisteredUserOnly"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const query = await db
            .select()
            .from(userWalletsTable)
            .where(eq(userWalletsTable.discordId, interaction.user.id));

        const wallet = query[0];

        return interaction.reply({
            content: `Your wallet balance is: ${wallet.balance}`,
        });
    }
}
