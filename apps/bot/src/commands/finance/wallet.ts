import { ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

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
        return interaction.reply({
            content: "This command is not yet implemented.",
        });
    }
}
