import type { Got } from "got";

import type {
  DiscordApiGuild,
  DiscordApiChannel
} from "./types/DiscordApi.js";

import Database from "./Database.js";
import showError from "./utils/showError.js";

/** A cluster is a guild. */
class Cluster {
  public guild_data: DiscordApiGuild;
  public databases: Database[];
  private api: Got;

  constructor (guild_data: DiscordApiGuild, guild_channels: DiscordApiChannel[], api: Got) {
    this.guild_data = guild_data;
    this.api = api;

    /** Initialize data. */
    this.databases = this.sortGuildChannels(guild_channels);
  }

  /**
   * Sort channels from the guild into
   * Database classes that contains their tables.
   */
  private sortGuildChannels (guild_channels: DiscordApiChannel[]) {
    const categories = guild_channels.filter(channel => channel.type === 4);
    const databases = categories.map(category => {
      /** Get every tables from the database (childs in category). */
      const tables = guild_channels.filter(channel =>
        channel.type === 0 && channel.parent_id == category.id
      );

      return new Database(category, tables, this.api);
    });

    return databases;
  }

  /** Create a new database (category) with no tables (text channel) */
  async createDatabase (name: string) {
    try {
      const response = await this.api.post(`guilds/${this.guild_data.id}/channels`, {
        json: {
          name,
          type: 4, // Category
          permission_overwrites: []
        }
      }).json<DiscordApiChannel>();

      const database =  new Database(response, [] as DiscordApiChannel[], this.api);
      this.databases.push(database);

      return database;
    }
    catch (e) {
      showError(e);
      return null;
    }
  }

  /**
   * Do this when `this.databases` isn't synced
   * with the guild real data.
   *
   * Everything is stored in cache so we don't have
   * to re-fetch every channels everytime.
   * Not synced data can only happen when something
   * not from the bot has been changed in the guild.
   *
   * Note that every Database or Table classes will
   * be obsolete. So you'll need to get their new object.
   */
  async updateDatabasesCache () {
    try {
      const guild_channels = await this.api.get(`guilds/${this.guild_data.id}/channels`)
        .json<DiscordApiChannel[]>();

      // Update local object.
      this.databases = this.sortGuildChannels(guild_channels);
      return true;
    }
    catch (e) {
      showError(e);
      return null;
    }
  }
}

export default Cluster;