import { bankAccountsTable, db, userWalletsTable } from "@imperia/database";
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
                    .addIntegerOption((option) =>
                        option.setName("amount").setDescription("The amount of credits to transfer.").setRequired(true)
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
        const query = await db
            .select()
            .from(bankAccountsTable)
            .where(eq(bankAccountsTable.discordId, interaction.user.id));

        const bankAccount = query[0];

        return interaction.reply({
            content: `Your account balance is ${bankAccount.balance} credits.`,
        });
    }

    public async chatInputRunDeposit(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const amount = interaction.options.getInteger("amount", true);

        if (amount <= 0) {
            return interaction.reply({
                content: "You cannot deposit less than 1 credit.",
            });
        }

        const userWalletQuery = await db
            .select()
            .from(userWalletsTable)
            .where(eq(userWalletsTable.discordId, interaction.user.id));
        const userWallet = userWalletQuery[0];

        const bankAccountQuery = await db
            .select()
            .from(bankAccountsTable)
            .where(eq(bankAccountsTable.discordId, interaction.user.id));
        const bankAccount = bankAccountQuery[0];

        if (userWallet.balance < amount) {
            return interaction.reply({
                content: "You do not have enough credits to deposit.",
            });
        }

        await db.transaction(async (tx) => {
            await tx
                .update(userWalletsTable)
                .set({ balance: userWallet.balance - amount })
                .where(eq(userWalletsTable.discordId, interaction.user.id));
            await tx
                .update(bankAccountsTable)
                .set({ balance: bankAccount.balance + amount })
                .where(eq(bankAccountsTable.discordId, interaction.user.id));
        });

        return interaction.reply({
            content: `You have successfully deposited ${amount} credits into your bank account.`,
        });
    }

    public async chatInputRunWithdraw(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const amount = interaction.options.getInteger("amount", true);

        if (amount <= 0) {
            return interaction.reply({
                content: "You cannot withdraw less than 1 credit.",
            });
        }

        const bankAccountQuery = await db
            .select()
            .from(bankAccountsTable)
            .where(eq(bankAccountsTable.discordId, interaction.user.id));
        const bankAccount = bankAccountQuery[0];

        if (bankAccount.balance < amount) {
            return interaction.reply({
                content: "You do not have enough credits to withdraw.",
            });
        }

        const userWalletQuery = await db
            .select()
            .from(userWalletsTable)
            .where(eq(userWalletsTable.discordId, interaction.user.id));
        const userWallet = userWalletQuery[0];

        await db.transaction(async (tx) => {
            await tx
                .update(userWalletsTable)
                .set({ balance: userWallet.balance + amount })
                .where(eq(userWalletsTable.discordId, interaction.user.id));
            await tx
                .update(bankAccountsTable)
                .set({ balance: bankAccount.balance - amount })
                .where(eq(bankAccountsTable.discordId, interaction.user.id));
        });

        return interaction.reply({
            content: `You have successfully withdrawn ${amount} credits from your bank account.`,
        });
    }

    public async chatInputRunTransfer(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const amount = interaction.options.getInteger("amount", true);
        const user = interaction.options.getUser("user", true);

        if (amount <= 0) {
            return interaction.reply({
                content: "You cannot transfer less than 1 credit.",
            });
        }

        if (user.id === interaction.user.id) {
            return interaction.reply({
                content: "You cannot transfer credits to yourself.",
            });
        }

        const bankAccountQuery = await db
            .select()
            .from(bankAccountsTable)
            .where(eq(bankAccountsTable.discordId, interaction.user.id));
        const bankAccount = bankAccountQuery[0];

        if (bankAccount.balance < amount) {
            return interaction.reply({
                content: "You do not have enough credits to transfer.",
            });
        }

        const recipientBankAccountQuery = await db
            .select()
            .from(bankAccountsTable)
            .where(eq(bankAccountsTable.discordId, user.id));

        if (recipientBankAccountQuery.length === 0) {
            return interaction.reply({
                content: "The recipient does not have a bank account.",
            });
        }

        const recipientBankAccount = recipientBankAccountQuery[0];

        await db.transaction(async (tx) => {
            await tx
                .update(bankAccountsTable)
                .set({ balance: bankAccount.balance - amount })
                .where(eq(bankAccountsTable.discordId, interaction.user.id));
            await tx
                .update(bankAccountsTable)
                .set({ balance: recipientBankAccount.balance + amount })
                .where(eq(bankAccountsTable.discordId, user.id));
        });

        return interaction.reply({
            content: `You have successfully transferred ${amount} credits to ${user.username}.`,
        });
    }
}
