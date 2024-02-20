export type SelectMenuOptions = {
    label: string;
    description: string;
    value: string;
};

export type CommandField = {
    name: `</${string}:${string}>`;
    value: string;
    inline: boolean;
};
