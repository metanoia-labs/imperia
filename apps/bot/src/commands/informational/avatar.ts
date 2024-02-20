import { EmbedBuilder, ImperiaCommand } from "@imperia/discord-bot";

export class PingCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, { ...options });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName("avatar")
                .setDescription("View your avatar or the avatar of another user.")
                .addUserOption((option) =>
                    option
                        .setName("user")
                        .setDescription(
                            "The user to view the avatar of. If not provided, the command will default to the user who used the command."
                        )
                )
        );
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const { id, tag, displayAvatarURL } = interaction.options.getUser("user") ?? interaction.user;
        const userInGuild = await interaction.guild.members.fetch(id);

        const avatarEmbed = [
            new EmbedBuilder()
                .setImage(displayAvatarURL({ size: 4096 }))
                .setAuthor({ name: tag, iconURL: displayAvatarURL() }),
            ...(displayAvatarURL() !== userInGuild.displayAvatarURL()
                ? [new EmbedBuilder().setImage(userInGuild.displayAvatarURL({ size: 4096 }))]
                : []),
        ];

        return interaction.reply({ embeds: avatarEmbed });
    }
}
