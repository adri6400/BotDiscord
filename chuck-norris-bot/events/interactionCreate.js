// events/interactionCreate.js
module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`Commande non reconnue : ${interaction.commandName}`);
        await interaction.reply({ content: 'Commande non reconnue.', ephemeral: true });
        return;
    }

    console.log(`Commande reconnue : ${interaction.commandName} par ${interaction.user.tag}`);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Une erreur est survenue lors de l\'exécution de la commande.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de la commande.', ephemeral: true });
        }
    }
};
