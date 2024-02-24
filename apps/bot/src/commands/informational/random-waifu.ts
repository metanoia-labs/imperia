import { EmbedBuilder, ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class RandomWaifuCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "random-waifu",
            description: "Retrive a random waifu image from the internet",
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
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription(`Here's your waifu! :3`).setImage(await this.getWaifu())],
        });
    }

    public async getWaifu() {
        const response = await fetch("https://api.waifu.pics/sfw/waifu");
        const data = await response.json();
        return data.url;
    }
}
