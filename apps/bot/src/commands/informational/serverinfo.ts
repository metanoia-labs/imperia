import { EmbedBuilder, ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

import { APIEmbedField } from "discord.js";
import { codeBlock } from "discord.js";

import dayjs from "dayjs";

export class ServerInformationCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "serverinfo",
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder()
            .setName("serverinfo")
            .setDescription("View information of the server where this command is executed.");

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const fieldResponses: APIEmbedField[] = await this.getFieldResponses(interaction);
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ size: 4096 }) })
                    .setFields([...fieldResponses]),
            ],
        });
    }

    private async getServerInformation(ctx: ImperiaCommand.ChatInputCommandInteraction) {
        const premiumTier: string[] = ["None", "Tier 1", "Tier 2", "Tier 3"];

        return {
            bio: {
                createdAt: dayjs(ctx.guild.createdAt),
                description: ctx.guild.description === null ? "No Description" : ctx.guild.description,
                id: ctx.guild.id,
                name: ctx.guild.name,
                ownership: (await ctx.guild.fetchOwner()).user,
            },
            statistic: {
                serverRoles: ctx.guild.roles.cache.size,
                emojis: ctx.guild.emojis.cache.size,
                members: ctx.guild.memberCount,
                channels: ctx.guild.channels.cache.size,
                stickers: ctx.guild.stickers.cache.size,
            },
            features: {
                boostLevel: premiumTier[ctx.guild.premiumTier],
                boostCount: ctx.guild.premiumSubscriptionCount,
                verifiedStatus: ctx.guild.verified ? "Verified" : "Not Verified",
                partneredStatus: ctx.guild.partnered ? "Partnered" : "Not Partnered",
                vanityURL: ctx.guild.vanityURLCode == null ? "-" : `https://discord.gg/${ctx.guild.vanityURLCode}`,
            },
        };
    }

    private async getFieldResponses(ctx: ImperiaCommand.ChatInputCommandInteraction) {
        const { bio, statistic, features } = await this.getServerInformation(ctx);

        const info: string[] = [
            `Name            :  ${bio.name}`,
            `Server Id       :  ${bio.id}` + "ㅤ",
            `Time Created    :  ${bio.createdAt.format("MMM, DD YYYY")}`,
            `Ownership       :  ${bio.ownership.username}`,
        ];

        const stats: string[] = [
            `Roles           :  ${statistic.serverRoles}`,
            `Emojis          :  ${statistic.emojis}`,
            `Members         :  ${statistic.members}`,
            `Channels        :  ${statistic.channels}`,
            `Stickers        :  ${statistic.stickers}`,
        ];

        const feats: string[] = [
            `Boost Level     :  ${features.boostLevel}`,
            `Boost Count     :  ${features.boostCount}`,
            `Verified        :  ${features.verifiedStatus}`,
            `Partnered       :  ${features.partneredStatus}`,
            `Vanity URL      :  ${features.vanityURL}`,
        ];

        return [
            { name: "Information", value: codeBlock(info.join("\n")) },
            { name: "Description", value: codeBlock(bio.description) },
            { name: "Statistics", value: codeBlock(stats.join("\n")) },
            { name: "Features", value: codeBlock(feats.join("\n")) },
        ] as APIEmbedField[];
    }
}
