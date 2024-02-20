import { ImperiaClientOptions } from "@imperia/discord-bot";
import { ActivityType, GatewayIntentBits } from "discord.js";

export const configuration: ImperiaClientOptions = {
    overrideApplicationCommandsRegistries: true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    baseUserDirectory: __dirname,
    loadMessageCommandListeners: true,
    loadSubcommandErrorListeners: true,
    loadDefaultErrorListeners: true,
    defaultPrefix: "imp.",
    presence: {
        activities: [
            {
                type: ActivityType.Playing,
                name: `a blissful, peaceful state of mind. ✨`,
            },
        ],
        status: "dnd",
    },
    typing: true,
};
