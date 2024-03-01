import { db, userWalletsTable, usersTable } from "@imperia/database";
import { EmbedBuilder, USER_AGREEMENT_ID, UserAgreementStatus } from "@imperia/discord-bot";
import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ButtonInteraction } from "discord.js";

interface ParsedData {
    userId: string;
    status: UserAgreementStatus;
}

export class UserAgreementHandler extends InteractionHandler {
    public constructor(context: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(context, {
            ...options,
            name: "user-agreement-handler",
            interactionHandlerType: InteractionHandlerTypes.Button,
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId.startsWith(USER_AGREEMENT_ID)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, userId, status] = interaction.customId.split("-");
            const currentStatus = status as UserAgreementStatus;

            if (currentStatus === UserAgreementStatus.CONFIRMED) {
                return this.some<ParsedData>({ userId, status: UserAgreementStatus.CONFIRMED });
            } else if (currentStatus === UserAgreementStatus.CANCELLED) {
                return this.some<ParsedData>({ userId, status: UserAgreementStatus.CANCELLED });
            }
        }
    }

    public async run(interaction: ButtonInteraction, data?: ParsedData) {
        await interaction.update({
            components: [],
        });

        if (data.status === UserAgreementStatus.CANCELLED) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: `${this.container.client.user.username}`,
                            iconURL: this.container.client.user.displayAvatarURL(),
                        })
                        .setDescription(
                            "You have declined Imperia's user agreement, and have not been registered. Some features may not be available to you, should you change your mind, you can re-run the register command."
                        ),
                ],
                ephemeral: true,
            });
        }

        await db.transaction(async (tx) => {
            await tx.insert(usersTable).values({
                discordId: data.userId,
            });
            await tx.insert(userWalletsTable).values({
                discordId: data.userId,
                balance: 0,
            });
        });

        return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: `${this.container.client.user.username}`,
                        iconURL: this.container.client.user.displayAvatarURL(),
                    })
                    .setDescription(
                        "You have agreed to Imperia's user agreement and have been registered. Welcome and enjoy your stay!"
                    ),
            ],
        });
    }
}
