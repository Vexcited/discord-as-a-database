import type {
  Got
} from "got";

import type {
  DiscordApiCurrentUser,
  DiscordApiGuild
} from "./types/DiscordApi.js";

import got from "got";

import showError from "./utils/showError.js";
import Cluster from "./Cluster.js";

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

  /**
   * Returns an object of requests for
   * this cluster (guild).
   */
  async getCluster (guild_id: string) {
    try {
      const guild_data = await this.api.get(`guilds/${guild_id}`)
        .json<DiscordApiGuild>();

      return new Cluster(guild_data, this.api);
    }
    catch (e) {
      showError(e);
      return null;
    }
  }
}

export default DiscordDatabase;