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