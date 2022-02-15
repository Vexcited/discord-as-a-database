import type { Got } from "got";

import type {
  DiscordApiChannel
} from "./types/DiscordApi.js";

import Table from "./Table.js";
import showError from "./utils/showError.js";

/** A database is a category. */
class Database {
  public category_data: DiscordApiChannel;
  public tables: Table[];
  private api: Got;

  constructor (category_data: DiscordApiChannel, tables: DiscordApiChannel[], api: Got) {
    this.category_data = category_data;
    this.api = api;

    this.tables = tables.map(channel_data => new Table(channel_data, this.api, this.deleteTable));
  }

  async createTable (name: string) {
    try {
      const response = await this.api.post(`guilds/${this.category_data.guild_id}/channels`, {
        json: {
          name,
          parent_id: this.category_data.id,
          permission_overwrites: [],
          type: 0 // Text channel.
        }
      }).json<DiscordApiChannel>();

      const table = new Table(response, this.api, this.deleteTable);
      this.tables.push(table);
      return table;
    }
    catch (e) {
      showError(e);
      return null;
    }
  }

  async deleteTable (table_id: string) {
    try {
      const response = await this.api.delete(`channels/${table_id}`)
        .json<DiscordApiChannel>();

      const tableIndex = this.tables.findIndex(table => table.channel_data.id === response.id);
      this.tables.splice(tableIndex, 1);
      return true;
    }
    catch (e) {
      showError(e);
      return null;
    }
  }
}

export default Database;