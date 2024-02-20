import { CommandField, EmbedBuilder, ImperiaCommand, SelectMenuOptions, checkDeveloper } from "@imperia/discord-bot";
import { MessageBuilder, PaginatedMessage } from "@sapphire/discord.js-utilities";
import { Command, CommandStore, RegisterBehavior } from "@sapphire/framework";
import { Collection, ComponentType, SlashCommandBuilder, chatInputApplicationCommandMention } from "discord.js";

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
        await interaction.deferReply();

        const commands: CommandStore = this.container.stores.get("commands");
        const categories: string[] = [...new Set(commands.map((cmd: ImperiaCommand) => cmd.category))];
        categories.unshift("primary");

        const paginate: PaginatedMessage = new PaginatedMessage();

        paginate.addPageBuilder((builder: MessageBuilder) => {
            const embed = new EmbedBuilder().setTitle("Help!").setDescription("To be added.");

            return builder.setEmbeds([embed]);
        });

        for (const category of categories) {
            if (category === "primary") continue;
            if (category === "system" && !checkDeveloper(interaction.user.id)) continue;

            const categoryCommands: Collection<string, Command> = commands.filter(
                (cmd: Command): boolean => cmd.category === category
            );
            const fields: ImperiaCommand[] = categoryCommands.map((cmd: ImperiaCommand) => cmd);

            const commandFields: CommandField[] = fields.map((cmd: ImperiaCommand) => {
                const commandId: string = this.container.applicationCommandRegistries.acquire(cmd.name).globalCommandId;
                let command;

                if (!commandId) command = `/${cmd.name}`;
                else command = chatInputApplicationCommandMention(cmd.name, commandId);

                return { name: command, value: `${cmd.description}`, inline: true };
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
            ...categories.map((category) => ({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                description:
                    category === "primary"
                        ? "View the initial page."
                        : `View ${category.charAt(0).toUpperCase() + category.slice(1)}-related commands.`,
                value: category,
            }))
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
}
