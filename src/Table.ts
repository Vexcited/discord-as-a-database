import type { Got } from "got";

import type {
  DiscordApiChannel
} from "./types/DiscordApi.js";

/** A table is a text channel. */
class Table {
  public channel_data: DiscordApiChannel;
  public entries: string[]; // Array of IDs, currently...
  private api: Got;

  constructor (channel_data: DiscordApiChannel, api: Got) {
    this.channel_data = channel_data;
    this.api = api;

    this.entries = [];
  }
}

export default Table;