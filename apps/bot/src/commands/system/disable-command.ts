import { DEVELOPMENT_SERVERS, EmbedBuilder, ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class DisableCommandCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "disable-command",
            description: "Globally disable a command.",
            requiredClientPermissions: ["SendMessages"],
            preconditions: ["DeveloperOnly"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const commands = this.container.stores.get("commands");

        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) =>
                option
                    .setName("command")
                    .setDescription("The command name to disable.")
                    .setRequired(true)
                    .addChoices(
                        ...commands.map((command) => ({ name: command.name, value: `${command.name.toLowerCase()}` }))
                    )
            );

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: DEVELOPMENT_SERVERS,
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const commandName = interaction.options.getString("command");

        const command = this.container.stores.get("commands").get(commandName);

        if (!command) {
            return interaction.reply({
                embeds: [new EmbedBuilder().setDescription("That command does not exist.")],
            });
        }

        if (command.enabled === false) {
            return interaction.reply({
                embeds: [new EmbedBuilder().setDescription("That command is already disabled.")],
            });
        }

        command.enabled = false;

        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription(`Disabled the command ${command.name}.`)],
        });
    }
}
