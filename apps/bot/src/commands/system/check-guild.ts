import { DEVELOPMENT_SERVERS, EmbedBuilder, ImperiaCommand, ImperiaEvents } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class CheckGuildCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "check-guild",
            description: "Manually triggers the guild creation event to sync and verify guild settings.",
            requiredClientPermissions: ["SendMessages"],
            preconditions: ["DeveloperOnly"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: DEVELOPMENT_SERVERS,
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        this.container.client.emit(ImperiaEvents.GuildCreate, interaction.guild);

        return interaction.reply({
            embeds: [
                new EmbedBuilder().isSuccessEmbed().setDescription("Manually triggered the guild creation event."),
            ],
        });
    }
}
