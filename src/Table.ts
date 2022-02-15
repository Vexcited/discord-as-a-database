import type { Got } from "got";

import type {
  DiscordApiChannel
} from "./types/DiscordApi.js";

/** A table is a text channel. */
class Table {
  public channel_data: DiscordApiChannel;
  public entries: string[]; // Array of IDs, currently...

  private deleteTableFunction: (table_id: string) => Promise<true | null>;
  private api: Got;

  /**
   * We pass the deleteTableFunction to constructor
   * to remove the Table object from 'tables' object
   * in Database class.
   */
  constructor (
    channel_data: DiscordApiChannel,
    api: Got,
    deleteTableFunction: (table_id: string) => Promise<true | null>
  ) {
    this.channel_data = channel_data;

    this.api = api;
    this.deleteTableFunction = deleteTableFunction;

    this.entries = [];
  }

  async deleteTable () {
    return await this.deleteTableFunction(
      this.channel_data.id
    );
  }
}

export default Table;