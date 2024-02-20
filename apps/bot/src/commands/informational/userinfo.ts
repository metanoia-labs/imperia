import { EmbedBuilder, ImperiaCommand, SelectMenuOptions } from "@imperia/discord-bot";
import { MessageBuilder, PaginatedMessage } from "@sapphire/discord.js-utilities";
import { RegisterBehavior } from "@sapphire/framework";

import { APIEmbedField, Collection, ComponentType } from "discord.js";
import { GuildMember, Role, SlashCommandBuilder, User } from "discord.js";
import { codeBlock } from "discord.js";

import dayjs from "dayjs";

export class UserInformationCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "userinfo",
            description: "View your information or the information of another user.",
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption((option) =>
                option.setName("user").setDescription("Defaults to the command user if no user is provided.")
            );

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        return this.generatePaginatedEmbeds(interaction);
    }

    private async generatePaginatedEmbeds(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const fieldResponses: APIEmbedField[] = await this.getFieldResponses(interaction);
        const userInformation = await this.getUserInformation(interaction);
        const paginate: PaginatedMessage = new PaginatedMessage();

        /**
         * * If the user has less than or equal to 3 roles,
         * * we can display all the information in one embed.
         */
        if (userInformation.roles.length <= 3) {
            paginate.addPageBuilder((builder: MessageBuilder) => {
                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({ size: 4096 }),
                    })
                    .addFields([...fieldResponses]);

                return builder.setEmbeds([embed]);
            });

            return paginate.run(interaction);
        }

        const options: string[] = ["User", "User Roles"];
        const embeds: APIEmbedField[][] = [
            fieldResponses,
            [{ name: "Roles", value: userInformation.roles.join(", ") }],
        ];

        for (const [index] of options.entries()) {
            paginate.addPageBuilder((builder: MessageBuilder) => {
                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({ size: 4096 }),
                    })
                    .addFields([...embeds[index]]);

                return builder.setEmbeds([embed]);
            });
        }

        const selectMenuOptions: SelectMenuOptions[] = [];

        options.forEach((option) => {
            selectMenuOptions.push({
                label: option,
                description: `Select to view ${option.toLowerCase()} information.`,
                value: option,
            });
        });

        paginate.setActions([
            {
                customId: "userinfo-command-select-menu",
                type: ComponentType.StringSelect,
                options: selectMenuOptions,
                placeholder: "View more information",
                run: ({ handler, interaction }) => {
                    if (interaction.isStringSelectMenu()) {
                        handler.index = options.indexOf(interaction.values[0]);
                    }
                },
            },
        ]);

        return paginate.run(interaction);
    }

    private async getUserInformation(ctx: ImperiaCommand.ChatInputCommandInteraction) {
        const user: User = ctx.options.getUser("user") || ctx.user;
        const userInGuild: GuildMember = await ctx.guild.members.fetch(user.id);

        const roles: Collection<string, Role> = userInGuild.roles.cache;
        const everyoneRole: Role = roles.filter((role) => role.name === "@everyone").first();
        const filteredRoles: Collection<string, Role> = roles.filter((role) => role !== everyoneRole);
        const sortedRoles: Collection<string, Role> = filteredRoles.sort((a, b) => b.position - a.position);

        return {
            bio: {
                id: user.id,
                name: user.tag,
                nickname: userInGuild.nickname == null ? "N/A" : userInGuild.nickname,
                accountType: user.bot ? "Discord Bot" : "Discord User",
                createdAt: dayjs(user.createdAt),
                joinedAt: dayjs(userInGuild.joinedAt),
            },
            roles: sortedRoles.map((role) => `<@&${role.id}>`),
        };
    }

    private async getFieldResponses(ctx: ImperiaCommand.ChatInputCommandInteraction) {
        const { bio, roles } = await this.getUserInformation(ctx);

        const info: string[] = [
            `Name            :  ${bio.name}`,
            `Nickname        :  ${bio.nickname}`,
            `User Id         :  ${bio.id}` + "ㅤ",
            `Account Created :  ${bio.createdAt.format("MMM, DD YYYY")}`,
            `Member Since    :  ${bio.joinedAt.format("MMM, DD YYYY")}`,
            `User/Bot        :  ${bio.accountType}`,
        ];

        const adjustedRoles =
            roles.length > 0
                ? roles.length > 3
                    ? roles.slice(0, 3).join(", ") + "..."
                    : roles.join(", ")
                : "No available roles.";

        return [
            { name: "Information", value: codeBlock(info.join("\n")) },
            { name: "Roles", value: adjustedRoles },
        ] as APIEmbedField[];
    }
}
