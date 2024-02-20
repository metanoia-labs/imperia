import { EmbedBuilder, ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { GuildMember, SlashCommandBuilder } from "discord.js";

export class AvatarCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "avatar",
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder()
            .setName("avatar")
            .setDescription("View your avatar or the avatar of another user.")
            .addUserOption((option) =>
                option
                    .setName("user")
                    .setDescription("View the avatar of a user. Defaults to the command user if no user is provided.")
            );

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const user = interaction.options.getUser("user") ?? interaction.user;
        const member: GuildMember = interaction.guild.members.cache.get(user.id);

        const userAvatar = user.displayAvatarURL({ size: 4096 });
        const memberAvatar = member.displayAvatarURL({ size: 4096 });

        const avatars: EmbedBuilder[] =
            userAvatar !== memberAvatar
                ? [
                      new EmbedBuilder()
                          .setAuthor({ name: `${user.username}'s avatar`, iconURL: userAvatar })
                          .setImage(userAvatar),
                      new EmbedBuilder().setImage(memberAvatar),
                  ]
                : [
                      new EmbedBuilder()
                          .setAuthor({ name: `${user.username}'s avatar`, iconURL: userAvatar })
                          .setImage(userAvatar),
                  ];

        return interaction.reply({ embeds: avatars });
    }
}
