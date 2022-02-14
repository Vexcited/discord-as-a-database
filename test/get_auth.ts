import DiscordDatabase from "../src/index.js";
import test from "ava";

if (!process.env.TEST_DISCORD_TOKEN) throw Error("TEST_DISCORD_TOKEN env not given.");
const TOKEN = process.env.TEST_DISCORD_TOKEN as string;

test("Check database object", async (t) => {
  const database = new DiscordDatabase(TOKEN);
  const user = await database.getUser();

  t.is(typeof user.id, "string");
});