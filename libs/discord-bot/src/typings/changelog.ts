export interface GitHubReleaseQueryResult {
    url: string;
    author: {
        login: string;
        avatar_url: string;
    };
    name: string;
    created_at: string;
    published_at: string;
    body: string;
}
