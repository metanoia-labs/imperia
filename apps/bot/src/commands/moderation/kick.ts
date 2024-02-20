import { EmbedBuilder, ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { GuildMember, SlashCommandBuilder, bold } from "discord.js";

export class KickCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "kick",
            description: "Kick a user from the server.",
            requiredClientPermissions: ["SendMessages", "KickMembers"],
            requiredUserPermissions: ["KickMembers"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption((option) =>
                option.setName("user").setDescription("The user to kick from the server.").setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("reason")
                    .setDescription("The reason for kicking the user from the server.")
                    .setRequired(false)
            );

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") ?? "No reason provided.";
        const member: GuildMember = interaction.guild.members.cache.get(user.id);

        if (member.kickable) {
            await member.kick();

            member.send({
                embeds: [
                    new EmbedBuilder().setDescription(
                        `You have been kicked from ${bold(interaction.guild.name)} for the following reason: ${reason}`
                    ),
                ],
            });

            return interaction.reply({
                embeds: [new EmbedBuilder().isSuccessEmbed().setDescription(`Successfully kicked ${bold(user.tag)}.`)],
            });
        }

        return interaction.reply({
            embeds: [new EmbedBuilder().isErrorEmbed().setDescription(`Unable to kick ${bold(user.tag)}.`)],
        });
    }
}
