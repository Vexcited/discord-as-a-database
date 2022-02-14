import DiscordDatabase from "../src/index.js";
import test from "ava";

if (!process.env.TEST_DISCORD_TOKEN) throw Error("TEST_DISCORD_TOKEN env not given.");
const TOKEN = process.env.TEST_DISCORD_TOKEN as string;
const database = new DiscordDatabase(TOKEN);

test("Successful connection", async (t) => {
  const user = await database.getUser();

  const userFetched = user !== null;
  if (!userFetched) t.fail("Current user wasn't able to be fetched: is null.");

  const discriminatorExists = typeof user?.discriminator === "string";
  const usernameExists = typeof user?.username === "string";
  const idExists = typeof user?.id === "string";
  const userIsABot = user?.bot === true;

  const objectAvailable = discriminatorExists && usernameExists && idExists && userIsABot;
  if (!objectAvailable) t.fail(`User object isn't correct: ${user}`);

  t.pass();
});