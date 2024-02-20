import { Listener } from "@sapphire/framework";
import { Client, Events } from "discord.js";

export class ReadyListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: Events.ClientReady,
        });
    }

    public async run(client: Client) {
        const { username, id } = client.user;
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    }
}
