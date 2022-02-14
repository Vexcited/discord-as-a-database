export interface DiscordApiUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  verified: boolean;
  email: string;
  flags: number;
  banner: string;
  accent_color: number;
  premium_type: 0 | 1 | 2;
  public_flags: number;
}