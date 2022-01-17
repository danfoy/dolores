const SquadMember = require('./SquadMember');
const { randomFrom } = require('../../util');
const { legends } = require('./legends.json');
const squadColours = ['#d78d18', '#31a1a0', '#66a103'];

module.exports = class SquadEmbed {
    constructor(interaction) {
        const squadSize = interaction.options.getInteger('size');
        const legendSelection = randomFrom(legends, squadSize, {array: true});
        const players = [
            interaction.options.getUser('teammate1'),
            interaction.options.getUser('teammate2'),
        ].filter(player => player != null);

        // Add the interaction user to the list if there are empty slots
        if (players.length && players.length < squadSize)
            players.unshift(interaction.user);

        const squadMembers = Array.from(legendSelection, ( legend, index ) =>
            new SquadMember(legend, players[index], squadColours[index]));

        // Return an object compatiable with discordjs reply/send
        this.embeds = Array.from(squadMembers, legend => legend.embed);
        this.files = Array.from(squadMembers, legend => legend.file);
    };
};
