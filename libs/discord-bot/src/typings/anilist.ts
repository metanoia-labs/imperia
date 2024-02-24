export interface AniListCoverImage {
    large: string;
}

export interface AniListTitle {
    romaji: string;
    native: string;
    english: string;
}

export interface AniListExternalLinks {
    url: string;
}

export interface AniListQueryResult {
    id: number;
    description: string;
    coverImage: AniListCoverImage;
    title: AniListTitle;
    externalLinks: AniListExternalLinks[];
    bannerImage?: string;
    format?: string;
    averageScore?: number;
    episodes?: number;
    status?: string;
    duration?: number;
}
