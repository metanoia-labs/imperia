import { container } from "@sapphire/framework";
import { DEVELOPERS } from "./constants";
import { chatInputApplicationCommandMention } from "discord.js";

export const checkDeveloper = (id: string) => DEVELOPERS.includes(id);

export const trimString = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
};

export const stripHtmlTags = (str: string) => str.replace(/<[^>]*>?/gm, "").replace(/<br\/?>/gm, "\n");

export const getCommandMention = (commandName: string): string | `</${string}:${string}>` => {
    const command = container.applicationCommandRegistries.acquire(commandName);
    const commandId = command.globalChatInputCommandIds.values().next().value;

    if (!commandId) return `/${commandName}`;

    return chatInputApplicationCommandMention(command.commandName, commandId);
};
