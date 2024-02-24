export interface KitsuQueryResult {
    links: {
        self: string;
    };
    attributes: {
        description: string;
        titles: {
            en_jp: string;
            ja_jp: string;
        };
        canonicalTitle: string;
        abbreviatedTitles: string[];
        posterImage: {
            tiny: string;
            small: string;
            medium: string;
            large: string;
            original: string;
        };
        coverImage: {
            tiny: string;
            small: string;
            large: string;
            original: string;
        };
    };
}
