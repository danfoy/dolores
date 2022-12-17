const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const thumbDir = __dirname + '/../Resources/Apex/Legends/';

module.exports = class SquadMember {
    constructor (legend, player, colour) {
        this.embed = new EmbedBuilder({
            color: colour ?? undefined,
            description: player?.username ? `**${legend.name}**` : legend.tagline,
            author: {
                name: player?.username ?? legend.name,
                icon_url: player?.displayAvatarURL() ?? undefined,
            },
            thumbnail: {
                url: `attachment://${legend.name}.png`,
            },
        });
        this.file = new AttachmentBuilder( thumbDir + `${legend.name}.png` );
    };
};
