import DiscordDatabase from "../src/index.js";
import test from "ava";

if (!process.env.TEST_DISCORD_TOKEN)
  throw Error("TEST_DISCORD_TOKEN env not given.");
if (!process.env.TEST_DISCORD_GUILD)
  throw Error("TEST_DISCORD_GUILD env not given.");

const TOKEN = process.env.TEST_DISCORD_TOKEN as string;
const GUILD_ID = process.env.TEST_DISCORD_GUILD as string;

const database = new DiscordDatabase(TOKEN);
const cluster = await database.getCluster(GUILD_ID);

test("Cluster is available", (t) => {
  if (!cluster)
    return t.fail(`Guild ${GUILD_ID} wasn't able to be fetched: is null`);

  t.pass();
});

test("Cluster data object is valid", (t) => {
  if (!cluster?.guild_data)
    return t.fail("Instance exists but data wasn't fetched: guild_data is undefined.");

  const idExists = typeof cluster?.guild_data.id === "string";
  const nameExists = typeof cluster?.guild_data.name === "string";
  const ownerExists = typeof cluster?.guild_data.owner_id === "string";

  const isValid = idExists && nameExists && ownerExists;
  if (!isValid) t.fail(`Cluster data object isn't correct: ${cluster.guild_data}`);

  t.pass();
});

test("Create a database in cluster", async (t) => {
  const createdDatabase = await cluster?.createDatabase("test-ava");
  if (!createdDatabase)
    return t.fail("Wasn't able to create a category channel.");

  const databaseIsCreated = cluster?.databases.filter(db => db.category_data.id === createdDatabase?.category_data.id);
  if (!databaseIsCreated || databaseIsCreated.length < 1)
    return t.fail("Database (category channel) wasn't found in cache !");

  const tablesNumber = databaseIsCreated[0].tables.length;
  t.deepEqual(tablesNumber, 0, "Should be 0 as the database is new.");
});