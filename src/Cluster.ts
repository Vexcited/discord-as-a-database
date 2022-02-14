import type { Got } from "got";

import type {
  DiscordApiGuild,
  DiscordApiChannel
} from "./types/DiscordApi.js";

import showError from "./utils/showError.js";

/** A cluster is a guild. */
class Cluster {
  public guild_data: DiscordApiGuild;
  private api: Got;

  constructor (guild_data: DiscordApiGuild, api: Got) {
    this.guild_data = guild_data;
    this.api = api;
  }

  async createDatabase (name: string) {
    try {
      const response = await this.api.post(`guilds/${this.guild_data.id}/channels`, {
        json: {
          name,
          type: 4, // Category
          permission_overwrites: []
        }
      }).json<DiscordApiChannel>();

      return response;
    }
    catch (e) {
      showError(e);
      return null;
    }
  }

  /**
   * Return a list of databases
   * (categories) available.
   */
  async getDatabases () {
    try {
      const categories = await this.api.get(`guilds/${this.guild_data.id}/channels`)
        .json<any[]>();
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