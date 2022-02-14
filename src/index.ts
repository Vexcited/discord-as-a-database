import type {
  Got
} from "got";

import type {
  DiscordApiCurrentUser,
  DiscordApiError
} from "./types/DiscordApi.js";

import got, { HTTPError } from "got";

import showError from "./utils/showError.js";

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
        "Authorization": `Bot ${token}sdfsdf`
      }
    });
  }

  /** Get current bot data. */
  async getUser (): Promise<DiscordApiCurrentUser | null> {
    try {
      const user = await this.api.get("users/@me")
        .json<DiscordApiCurrentUser>();

      return user;
    }
    catch (e) {
      showError(e);
      return null;
    }
  }
}

export default DiscordDatabase;