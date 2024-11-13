// commands/JokeCommand.js
const { ApplicationCommandOptionType } = require('discord.js');
const ChuckNorrisAPI = require('../utils/ChuckNorrisAPI');

class JokeCommand {
    constructor() {
        this.name = 'joke';
        this.description = 'Obtenir une blague de Chuck Norris.';
        this.options = [
            {
                name: 'category',
                type: ApplicationCommandOptionType.String, // Correct type
                description: 'Catégorie de la blague',
                required: false,
            },
            {
                name: 'id',
                type: ApplicationCommandOptionType.String, // Correct type
                description: 'ID de la blague',
                required: false,
            },
        ];
    }

    async execute(interaction) {
        const category = interaction.options.getString('category');
        const id = interaction.options.getString('id');

        try {
            if (id) {
                const joke = await ChuckNorrisAPI.getJokeById(id);
                await interaction.reply(joke.value);
            } else if (category) {
                const joke = await ChuckNorrisAPI.getRandomJokeByCategory(category);
                await interaction.reply(joke.value);
            } else {
                const joke = await ChuckNorrisAPI.getRandomJoke();
                await interaction.reply(joke.value);
            }
        } catch (error) {
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}

module.exports = JokeCommand;
