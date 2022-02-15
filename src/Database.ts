import type { Got } from "got";

import type {
  DiscordApiChannel
} from "./types/DiscordApi.js";

import Table from "./Table.js";

/** A database is a category. */
class Database {
  public category_data: DiscordApiChannel;
  public tables: Table[];
  private api: Got;

  constructor (category_data: DiscordApiChannel, tables: DiscordApiChannel[], api: Got) {
    this.category_data = category_data;
    this.api = api;

    this.tables = tables.map(channel_data => new Table(channel_data, this.api));
  }
}

export default Database;