import { DEVELOPERS, ImperiaIdentifiers } from "@imperia/discord-bot";
import { Precondition } from "@sapphire/framework";
import { CommandInteraction } from "discord.js";

export class DeveloperOnlyPrecondition extends Precondition {
    public constructor(context: Precondition.LoaderContext, options: Precondition.Options) {
        super(context, {
            ...options,
            name: ImperiaIdentifiers.DeveloperOnly,
        });
    }

    public async chatInputRun(interaction: CommandInteraction) {
        if (DEVELOPERS.includes(interaction.user.id)) {
            return this.ok();
        } else {
            return this.error({
                message: "This command is only available to developers.",
                identifier: ImperiaIdentifiers.DeveloperOnly,
            });
        }
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        DeveloperOnly: never;
    }
}
