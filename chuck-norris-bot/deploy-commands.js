// deploy-commands.js
const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const CommandClass = require(`./commands/${file}`);
    const commandInstance = new CommandClass();
    const cmd = {
        name: commandInstance.name,
        description: commandInstance.description,
        options: commandInstance.options || [],
    };
    commands.push(cmd);
}

// Ajoutez un log pour voir les commandes
console.log('Commandes à déployer :', JSON.stringify(commands, null, 2));

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Début de l\'enregistrement des commandes.');

        await rest.put(
            Routes.applicationCommands('1306203370993745940'), // Remplacez par votre ID d'application
            { body: commands },
        );

        console.log('Commandes enregistrées avec succès.');
    } catch (error) {
        console.error(error);
    }
})();
