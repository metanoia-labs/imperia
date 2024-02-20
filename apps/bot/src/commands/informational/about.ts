import { EmbedBuilder, ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class AboutCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "about",
            description: "Retrive information about Imperia",
            requiredClientPermissions: ["SendMessages"],
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
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: `${this.container.client.user.username}`,
                        iconURL: this.container.client.user.displayAvatarURL(),
                    })
                    .setDescription(
                        `Imperia is a versatile and multipurpose Discord bot with a comprehensive array of features.`
                    ),
            ],
        });
    }
}
