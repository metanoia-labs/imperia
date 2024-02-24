import {
    EmbedBuilder,
    ImperiaCommand,
    ImperiaIdentifiers,
    trimString,
    stripHtmlTags,
    KitsuQueryResult,
} from "@imperia/discord-bot";
import { RegisterBehavior, UserError } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class KitsuCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "kitsu",
            description: "Query Kitsu for information about an an anime or manga.",
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

        const result = await this.kitsuSearch(title, type as "anime" | "manga");

        const trimDescription = trimString(result.attributes.description, 2048);
        const description = stripHtmlTags(trimDescription);

        const response = new EmbedBuilder();

        response.setAuthor({
            name: `${result.attributes.titles.en_jp} (${result.attributes.titles.ja_jp})`,
        });
        response.setDescription(description);
        response.setThumbnail(result.attributes.posterImage.large);

        if (result.attributes.coverImage.original) response.setImage(result.attributes.coverImage.original);

        return interaction.editReply({
            embeds: [response],
        });
    }

    private async kitsuSearch(title: string, type: "anime" | "manga"): Promise<KitsuQueryResult> {
        const url = `https://kitsu.io/api/edge/`;
        const search = encodeURIComponent(title);

        try {
            const response = await fetch(`${url}/${type}?filter[text]=${search}`);
            const data = await response.json();

            if (data.data.length === 0) {
                new UserError({
                    identifier: ImperiaIdentifiers.SearchResultsNotFound,
                    message: "No results found for the provided search.",
                    context: { search, type },
                });
            }

            return data.data[0];
        } catch (error) {
            new UserError({
                identifier: ImperiaIdentifiers.SearchResultsNotFound,
                message: "No results found for the provided search.",
                context: { search, type },
            });
        }
    }
}
