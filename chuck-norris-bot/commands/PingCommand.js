// commands/PingCommand.js
class PingCommand {
    constructor() {
        this.name = 'ping';
        this.description = 'Tester la latence du bot.';
    }

    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pong!', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Pong! Latence: ${latency}ms`);
    }
}

module.exports = PingCommand;