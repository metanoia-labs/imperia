import { EmbedBuilder, ImperiaEvents } from "@imperia/discord-bot";
import { ChatInputCommandDeniedPayload, Identifiers, Listener, UserError } from "@sapphire/framework";
import { InteractionResponse } from "discord.js";

export class ChatInputCommandDeniedListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: ImperiaEvents.ChatInputCommandDenied,
        });
    }

    public async run(error: UserError, data: ChatInputCommandDeniedPayload): Promise<InteractionResponse<boolean>> {
        const embed: EmbedBuilder = new EmbedBuilder().isErrorEmbed();

        switch (error.identifier) {
            case Identifiers.PreconditionCooldown:
                embed.setDescription("Please wait before using this command again.");
                return data.interaction.reply({ embeds: [embed], ephemeral: true });
            case Identifiers.PreconditionUserPermissions || Identifiers.PreconditionUserPermissionsNoPermissions:
                embed.setDescription("You do not have the required permissions to use this command.");
                return data.interaction.reply({ embeds: [embed], ephemeral: true });
            case Identifiers.PreconditionClientPermissions || Identifiers.PreconditionClientPermissionsNoPermissions:
                embed.setDescription("I do not have the required permissions to use this command.");
                return data.interaction.reply({ embeds: [embed], ephemeral: true });
            default:
                this.container.logger.error(error);
                embed.setDescription(
                    `An error occurred while executing this command.\n${error.identifier}\n${error.message}`
                );
                return data.interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}
