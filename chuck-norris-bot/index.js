// index.js
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

// Création du client Discord avec les intents appropriés
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Chargement des commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const CommandClass = require(`./commands/${file}`);
    const command = new CommandClass();
    client.commands.set(command.name, command);
    console.log(`Commande chargée : ${command.name}`);
}

// Chargement des événements
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
}

// Connexion du bot
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
