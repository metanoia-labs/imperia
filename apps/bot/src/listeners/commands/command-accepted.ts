import { db, usersTable } from "@imperia/database";
import { EmbedBuilder, ImperiaEvents, USER_AGREEMENT_ID, UserAgreementStatus } from "@imperia/discord-bot";
import { ChatInputCommandAcceptedPayload } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { eq } from "drizzle-orm";

export class ChatInputCommandAcceptedListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: ImperiaEvents.ChatInputCommandAccepted,
        });
    }

    public async run(data: ChatInputCommandAcceptedPayload) {
        const userQuery = await db.select().from(usersTable).where(eq(usersTable.discordId, data.interaction.user.id));
        if (userQuery.length === 0) {
            await data.interaction.deferReply({ ephemeral: true });

            const actionButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId(`${USER_AGREEMENT_ID}-${data.interaction.user.id}-${UserAgreementStatus.CONFIRMED}`)
                    .setLabel("Agree")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(`${USER_AGREEMENT_ID}-${data.interaction.user.id}-${UserAgreementStatus.CANCELLED}`)
                    .setLabel("Decline")
                    .setStyle(ButtonStyle.Danger)
            );

            return data.interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Please wait!")
                        .setDescription(
                            "Imperia is a versatile and multipurpose Discord bot with a comprehensive array of features.\nWe'll be collecting some data from you to improve your experience with Imperia, please read our user agreement before proceeding.\n\nLINK TBA"
                        ),
                ],
                components: [actionButtons],
            });
        }
    }
}
