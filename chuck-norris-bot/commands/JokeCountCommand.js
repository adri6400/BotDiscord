// commands/JokeCountCommand.js
const ChuckNorrisAPI = require('../utils/ChuckNorrisAPI');

class JokeCountCommand {
    constructor() {
        this.name = 'jokecount';
        this.description = 'Obtenir le nombre de catégories de blagues disponibles.';
    }

    async execute(interaction) {
        try {
            const count = await ChuckNorrisAPI.getJokeCount();
            await interaction.reply(`Il y a ${count} catégories de blagues disponibles.`);
        } catch (error) {
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}

module.exports = JokeCountCommand;
