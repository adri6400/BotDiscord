// commands/JokeCategoriesCommand.js
const ChuckNorrisAPI = require('../utils/ChuckNorrisAPI');

class JokeCategoriesCommand {
    constructor() {
        this.name = 'jokecategories';
        this.description = 'Obtenir les catégories de blagues disponibles.';
    }

    async execute(interaction) {
        try {
            const categories = await ChuckNorrisAPI.getCategories();
            await interaction.reply(`**Catégories disponibles :**\n${categories.join(', ')}`);
        } catch (error) {
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}

module.exports = JokeCategoriesCommand;