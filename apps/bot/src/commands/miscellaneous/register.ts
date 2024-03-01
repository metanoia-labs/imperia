import { db, usersTable } from "@imperia/database";
import { EmbedBuilder, ImperiaCommand, USER_AGREEMENT_ID, UserAgreementStatus } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { ButtonBuilder, ButtonStyle, hyperlink } from "discord.js";
import { ActionRowBuilder, SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";

export class RegisterCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "register",
            description: "Regiters and syncs your account with Imperia.",
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
        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true,
        });

        const query = await db.select().from(usersTable).where(eq(usersTable.discordId, interaction.user.id));
        if (query.length === 0) {
            const actionButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId(`${USER_AGREEMENT_ID}-${interaction.user.id}-${UserAgreementStatus.CONFIRMED}`)
                    .setLabel("Agree")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(`${USER_AGREEMENT_ID}-${interaction.user.id}-${UserAgreementStatus.CANCELLED}`)
                    .setLabel("Decline")
                    .setStyle(ButtonStyle.Danger)
            );

            const privacyPolicy = hyperlink("Privacy Policy", "https://imperia-bot.vercel.app/privacy-policy");
            const termsOfService = hyperlink("Terms of Service", "https://imperia-bot.vercel.app/terms-of-service");

            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: `${this.container.client.user.username}`,
                            iconURL: this.container.client.user.displayAvatarURL(),
                        })
                        .setDescription(
                            `Imperia will be collecting data from you to sync your account with our database. Please review our user agreement that is our terms of service and privacy policy before proceeding.\n\nBy clicking the "Agree" button, you are agreeing to our user agreement and will be registered with Imperia. If you decline, you will not be registered and will not be able to use Imperia's features.\n\n${privacyPolicy} | ${termsOfService}\n\nIf you have any questions, feel free to join my support server or visit my website.`
                        ),
                ],
                components: [actionButtons],
            });
        }

        return interaction.editReply({
            content: "You are already registered.",
        });
    }
}
