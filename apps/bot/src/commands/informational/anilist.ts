import {
    AniListQueryResult,
    EmbedBuilder,
    ImperiaCommand,
    ImperiaIdentifiers,
    trimString,
    stripHtmlTags,
} from "@imperia/discord-bot";
import { RegisterBehavior, UserError } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class AnilistCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "anilist",
            description: "Query AniList for information about an an anime or manga.",
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) =>
                option
                    .setName("type")
                    .setDescription("The type of media to search for.")
                    .setRequired(true)
                    .addChoices({ name: "Anime", value: "anime" }, { name: "Manga", value: "manga" })
            )
            .addStringOption((option) =>
                option.setName("title").setDescription("The title of the media to search for.").setRequired(true)
            );

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        await interaction.deferReply();

        const type = interaction.options.getString("type");
        const title = interaction.options.getString("title");

        if (["anime", "manga"].includes(type) === false) {
            return interaction.reply({
                embeds: [new EmbedBuilder().setDescription("Invalid media type.")],
            });
        }

        const result = await this.anilistSearch(title, type as "anime" | "manga");

        const trimDescription = trimString(result.description, 2048);
        const description = stripHtmlTags(trimDescription);

        const response = new EmbedBuilder();

        response.setAuthor({
            name: `${result.title.english || result.title.romaji} (${result.title.native})`,
        });
        response.setDescription(description);
        response.setThumbnail(result.coverImage.large);

        if (result.bannerImage) response.setImage(result.bannerImage);

        return interaction.editReply({
            embeds: [response],
        });
    }

    private async anilistSearch(search: string, type: "anime" | "manga" = "anime"): Promise<AniListQueryResult> {
        const url = `https://graphql.anilist.co`;
        const mediaType = type === "anime" ? "ANIME" : "MANGA";

        const variables = { search, mediaType };
        const query = `#graphql 
        query ($search: String,  $type: MediaType) { 
            Media(search: $search, type: $type) { 
                id externalLinks { url }
                description
                coverImage { large }
                title { romaji native english } 
                bannerImage
                status 
                format
                averageScore
                episodes
                duration 
            } 
        }`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ query, variables }),
            }).then((response) => response.json());

            return response.data.Media;
        } catch (error) {
            this.container.logger.error(error);

            new UserError({
                identifier: ImperiaIdentifiers.SearchResultsNotFound,
                message: "No results found for the provided search.",
                context: { search, type },
            });
        }
    }
}
