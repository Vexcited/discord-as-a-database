export interface DiscordApiError {
  message: string;
  code: number;
}

export interface DiscordApiCurrentUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot: boolean;
}

export interface DiscordApiGuild {
  id: string;
  name: string;
  owner_id: string;
  description: null | string;
}

export interface DiscordApiChannel {
  position: number;

  guild_id: string;
  name: string;
  id: string;

  /**
   * Null when it's a category (type: 4).
   * Null when a channel isn't in a category.
   */
  parent_id: string | null;
  type:
    | 4 // Category
    | 0 // Text Channel (in guild)
}