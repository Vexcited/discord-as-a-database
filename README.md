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

**In coming...**