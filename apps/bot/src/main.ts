import { ImperiaClient } from "@imperia/discord-bot";
import { configuration } from "./configuration";

const main = async (): Promise<void> => {
    void new ImperiaClient(configuration).login(process.env.DISCORD_TOKEN);
};

void main();
