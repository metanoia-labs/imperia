import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { ImperiaCommand } from "@imperia/discord-bot";

export class PingCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, { ...options });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName("ping").setDescription("Ping bot to see if it is alive.")
        );
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const msg = await interaction.reply({ content: `Ping?`, ephemeral: true, fetchReply: true });

        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }

        return interaction.editReply("Failed to retrieve ping :(");
    }
}
