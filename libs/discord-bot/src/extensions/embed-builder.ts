import { EmbedBuilder as BaseEmbedBuilder } from "discord.js";
import { Colors } from "../utils/colors";

export class EmbedBuilder extends BaseEmbedBuilder {
    public constructor() {
        super();
        this.setColor(Colors.primary);
    }

    isErrorEmbed(): this {
        this.setColor(Colors.error);
        return this;
    }

    isSuccessEmbed(): this {
        this.setColor(Colors.success);
        return this;
    }
}
