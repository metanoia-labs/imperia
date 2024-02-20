import { db, usersTable } from "@imperia/database";
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
            name: "unregister-confirm",
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
                embeds: [new EmbedBuilder().setDescription("You have declined Imperia's user agreement.")],
                ephemeral: true,
            });
        }

        await db.transaction(async (tx) => {
            await tx.insert(usersTable).values({
                discordId: data.userId,
            });
        });

        return interaction.reply({
            embeds: [
                new EmbedBuilder().setDescription(
                    "You have agreed to Imperia's user agreement, please re-run any command you were trying to run."
                ),
            ],
            ephemeral: true,
        });
    }
}
