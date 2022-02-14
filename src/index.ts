import type { Got } from "got";
import type { DiscordApiUser } from "./types/DiscordApi.js";

import got from "got";

class DiscordDatabase {
  private api: Got;

  constructor (token: string) {
    const userAgent = {
      name: "discord-as-a-database",
      url: "https://github.com/Vexcited/discord-as-a-database",
      version: "1.0.0"
    };

    this.api = got.extend({
      prefixUrl: "https://discord.com/api/v9",
      headers: {
        "User-Agent": `${userAgent.name} (${userAgent.url}, ${userAgent.version})`,
        "Authorization": `Bot ${token}`
      }
    });
  }

  /** Get current bot data. */
  async getUser () {
    const user = await this.api.get("users/@me")
      .json<DiscordApiUser>();

    return user;
  }
}

export default DiscordDatabase;