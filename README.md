# discord-database

> Provides helpers and an API to use Discord as a database.

## Presentation

discord-database uses guilds as databases cluster.
In that cluster, you can setup new databases (it uses categories to do that).
In these databases, you'll be able to create tables (it uses text channels).

To make a new entry into that table, it creates a new message in that channel.

## Limitations

- Entries should always be parsed in `string`. 

## Set-up

First add it to your Discord cluster server using this URL (only the needed
permissions was added to prevent other uses).

`https://discord.com/oauth2/authorize?client_id=APPLICATION_ID&scope=bot&permissions=126160`
*Don't forget to replace `APPLICATION_ID` with yours.*


## Installation

*currently not published on NPM... please wait the first release.*

## Usage

Firstly, you need to initialize the database with
the token of the bot you'll use.

```typescript
import DiscordDatabase from "discord-as-a-database";

// Where TOKEN is your bot token (string).
const database = new DiscordDatabase(TOKEN);
```

Next, you can get data from this user like this.

```typescript
// Returns <https://discord.com/developers/docs/resources/user#get-current-user>.
// or null if an error occured.
const bot_data = await database.getUser();
console.info(bot_data);
```

Access to a *cluster* (guild) with their ID (snowflake).

```typescript
const cluster = await database.getCluster(GUILD_ID);

// guild_data will contains <https://discord.com/developers/docs/resources/guild#get-guild>
// or null if an error occured.
console.info(cluster.guild_data);
```