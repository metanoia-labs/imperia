import { bankAccountsTable, db } from "@imperia/database";
import { ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";

export class BankCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "bank",
            description: "Manage your bank account.",
            preconditions: ["RegisteredUserOnly"],
            subcommands: [
                {
                    name: "create",
                    chatInputRun: "chatInputRunCreate",
                },
                {
                    name: "balance",
                    chatInputRun: "chatInputRunBalance",
                },
                {
                    name: "deposit",
                    chatInputRun: "chatInputRunDeposit",
                },
                {
                    name: "withdraw",
                    chatInputRun: "chatInputRunWithdraw",
                },
                {
                    name: "transfer",
                    chatInputRun: "chatInputRunTransfer",
                },
            ],
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand((subcommand) => subcommand.setName("create").setDescription("Create a bank account."))
            .addSubcommand((subcommand) => subcommand.setName("balance").setDescription("View your account balance."))
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("deposit")
                    .setDescription("Deposit credits into your bank account.")
                    .addIntegerOption((option) =>
                        option.setName("amount").setDescription("The amount of credits to deposit.").setRequired(true)
                    )
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("withdraw")
                    .setDescription("Withdraw credits from your bank account.")
                    .addIntegerOption((option) =>
                        option.setName("amount").setDescription("The amount of credits to withdraw.").setRequired(true)
                    )
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("transfer")
                    .setDescription("Transfer credits between bank accounts.")
                    .addUserOption((option) =>
                        option.setName("user").setDescription("The user to transfer credits to.").setRequired(true)
                    )
            );

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRunCreate(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const query = await db
            .select()
            .from(bankAccountsTable)
            .where(eq(bankAccountsTable.discordId, interaction.user.id));
        if (query.length === 0) {
            await db.insert(bankAccountsTable).values({
                discordId: interaction.user.id,
                balance: 0,
            });

            return interaction.reply({
                content: "You have successfully created a bank account.",
            });
        }

        return interaction.reply({
            content: "You already have a bank account.",
        });
    }

    public async chatInputRunBalance(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        return interaction.reply({
            content: "This command is not yet implemented.",
        });
    }

    public async chatInputRunDeposit(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        return interaction.reply({
            content: "This command is not yet implemented.",
        });
    }

    public async chatInputRunWithdraw(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        return interaction.reply({
            content: "This command is not yet implemented.",
        });
    }

    public async chatInputRunTransfer(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        return interaction.reply({
            content: "This command is not yet implemented.",
        });
    }
}
