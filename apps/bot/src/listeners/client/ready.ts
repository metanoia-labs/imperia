import { ImperiaEvents } from "@imperia/discord-bot";
import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";

export class ReadyListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: ImperiaEvents.ClientReady,
        });
    }

    public async run(client: Client) {
        const { username, id } = client.user;
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    }
}
