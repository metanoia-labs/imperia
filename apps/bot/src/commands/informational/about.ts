import { EmbedBuilder, ImperiaCommand, getCommandMention } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from "discord.js";

export class AboutCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "about",
            description: "Retrive information about Imperia",
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
        const helpCommand = getCommandMention("help");
        const registerCommand = getCommandMention("register");

        const links = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel("Invite")
                .setStyle(ButtonStyle.Link)
                .setURL("https://imperia-bot.vercel.app/invite"),
            new ButtonBuilder()
                .setLabel("Support Server")
                .setStyle(ButtonStyle.Link)
                .setURL("https://imperia-bot.vercel.app/support-server"),
            new ButtonBuilder().setLabel("Website").setStyle(ButtonStyle.Link).setURL("https://imperia-bot.vercel.app/")
        );

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: `${this.container.client.user.username}`,
                        iconURL: this.container.client.user.displayAvatarURL(),
                    })
                    .setDescription(
                        `~Hi-ya! I'm Imperia! A versatile and multipurpose Discord bot with a comprehensive array of features. Imperia is of Latin origin; Typically feminine, and comes from the word Impĕro which means command, power, or imperial.\n\nMy feature set is still in it's early stages, but it includes performing tasks such as server administration, effortless moderation with automated systems, various entertainment options, and more!`
                    )
                    .addFields({
                        name: "— Getting Started",
                        value: `Imperia is designed to be user-friendly and easy to use. The ${helpCommand} command will provide you with a list of available commands and their descriptions. If you're new, use the ${registerCommand} command to unlock my full potential and access to all my features.\n\nIf you have any questions, feel free to join my support server or visit my website.`,
                    })
                    .setFooter({
                        text: `A project by @elizielx | Version: ${this.getVersionFromPackage()}`,
                    }),
            ],
            components: [links],
        });
    }

    private getVersionFromPackage() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { version } = require("../../../../../package.json");
        return version;
    }
}
