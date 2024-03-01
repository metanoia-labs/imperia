import { EmbedBuilder, GitHubReleaseQueryResult, ImperiaCommand, ImperiaIdentifiers } from "@imperia/discord-bot";
import { RegisterBehavior, UserError } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class ChangelogCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "changelog",
            description: "View the latest changes to Imperia from the GitHub repository releases.",
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
        const release = await this.getLatestRelease();

        const embed = new EmbedBuilder();

        embed.setAuthor({
            name: `@${release.author.login}`,
            iconURL: release.author.avatar_url,
            url: release.url,
        });
        embed.setDescription(
            this.removeThanksFromChangelog(release.body).substring(0, 2048) + (release.body.length > 2048 ? "..." : "")
        );

        return interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    }

    private async getLatestRelease(): Promise<GitHubReleaseQueryResult> {
        const url = "https://api.github.com/repos/metanoia-labs/imperia/releases/latest";

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github+json",
                },
            }).then((response) => response.json());

            return response;
        } catch (error) {
            this.container.logger.error(error);

            new UserError({
                identifier: ImperiaIdentifiers.SearchResultsNotFound,
                message: "No results found for the provided fetch.",
            });
        }
    }

    private removeThanksFromChangelog(changelog: string): string {
        const patternToRemove = /\r\n\r\n\r\n### ❤️ {2}Thank You\r\n([\s\S]*?)$/;

        return changelog.replace(patternToRemove, "");
    }
}
