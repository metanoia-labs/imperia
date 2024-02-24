import { CommandField, EmbedBuilder, ImperiaCommand, SelectMenuOptions, checkDeveloper } from "@imperia/discord-bot";
import { MessageBuilder, PaginatedMessage } from "@sapphire/discord.js-utilities";
import { Command, CommandStore, RegisterBehavior } from "@sapphire/framework";
import {
    Collection,
    ComponentType,
    SlashCommandBuilder,
    chatInputApplicationCommandMention,
    hyperlink,
} from "discord.js";

export class HelpCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "help",
            description: "Retrive a helpful information about Imperia and its available commands.",
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        /**
         * ! Here be dragons.
         */

        await interaction.deferReply();

        const commands: CommandStore = this.container.stores.get("commands");
        const categories: string[] = [...new Set(commands.map((cmd: ImperiaCommand) => cmd.category))];
        categories.unshift("primary");

        const paginate: PaginatedMessage = new PaginatedMessage();

        const invite = hyperlink(
            "Invite to Server",
            "https://discord.com/api/oauth2/authorize?client_id=911590809873301514&permissions=0&scope=applications.commands%20bot"
        );
        const website = hyperlink("Explore the Website", "https://imperia-bot.vercel.app/");
        const support = hyperlink("Join Support Server", "https://discord.gg/KfhgHw7pvn");

        paginate.addPageBuilder((builder: MessageBuilder) => {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `${this.container.client.user.username}`,
                    iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                    `Here, you can find a list of available commands and their descriptions. Please use the select menu below to navigate through the available command categories.\n\nInterested about Imperia? Use ${this.getCommandMention(
                        "about"
                    )} to find out more!`
                )
                .addFields({
                    name: "— Useful Links",
                    value: `${invite}\n${website}\n${support}`,
                });

            return builder.setEmbeds([embed]);
        });

        categories.splice(categories.indexOf("system"), !checkDeveloper(interaction.user.id) ? 1 : 0);

        for (const category of categories) {
            if (category === "primary") continue;
            if (category === "system" && !checkDeveloper(interaction.user.id)) continue;

            const categoryCommands: Collection<string, Command> = commands.filter(
                (cmd: Command): boolean => cmd.category === category
            );
            const fields: ImperiaCommand[] = categoryCommands.map((cmd: ImperiaCommand) => cmd);

            const commandFields: CommandField[] = fields.map((cmd: ImperiaCommand) => {
                const command = this.getCommandMention(cmd.name);

                return { name: command, value: cmd.description, inline: true } as CommandField;
            });

            paginate.addPageBuilder((builder: MessageBuilder) => {
                const embed = new EmbedBuilder()
                    .setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} commands`)
                    .addFields(commandFields);

                return builder.setEmbeds([embed]);
            });
        }

        const selectMenuOptions: SelectMenuOptions[] = [];

        selectMenuOptions.push(
            ...categories
                .map((category) => {
                    if (category === "system" && !checkDeveloper(interaction.user.id)) {
                        return null;
                    }

                    return {
                        label: category.charAt(0).toUpperCase() + category.slice(1),
                        description:
                            category === "primary"
                                ? "View the initial page."
                                : `View ${category.charAt(0).toUpperCase() + category.slice(1)}-related commands.`,
                        value: category,
                    };
                })
                .filter(Boolean)
        );

        paginate.setActions([
            {
                customId: "help-command-select-menu",
                type: ComponentType.StringSelect,
                options: selectMenuOptions,
                placeholder: "Select a category to view commands.",
                run: ({ handler, interaction }) => {
                    if (interaction.isStringSelectMenu()) {
                        handler.index = categories.indexOf(interaction.values[0]);
                    }
                },
            },
        ]);

        return paginate.run(interaction);
    }

    private getCommandMention(commandName: string): string | `</${string}:${string}>` {
        const command = this.container.applicationCommandRegistries.acquire(commandName);
        const commandId = command.globalChatInputCommandIds.values().next().value;

        if (!commandId) return `/${commandName}`;

        return chatInputApplicationCommandMention(command.commandName, commandId);
    }
}
