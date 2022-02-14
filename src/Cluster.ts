import type { Got } from "got";
import type { DiscordApiGuild } from "./types/DiscordApi.js";

import showError from "./utils/showError.js";

/** A cluster is a guild. */
class Cluster {
  public guild_data: DiscordApiGuild;
  private api: Got;

  constructor (guild_data: DiscordApiGuild, api: Got) {
    this.guild_data = guild_data;
    this.api = api;
  }

  /**
   * Return a list of databases
   * (categories) available.
   */
  async getDatabases () {
    try {
      const categories = await this.api.get(`guilds/${this.guild_data.id}/channels`)
        .json();
      console.log(categories);

      return categories;
    }
    catch (e) {
      showError(e);
      return null;
    }
  }
}

export default Cluster;