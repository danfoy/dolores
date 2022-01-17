const { bot } = require('../../config.json');
const thumbDir = bot.projectRoot + bot.staticRoot + 'Apex/Legends/';
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = class SquadMember {
    constructor (legend, player, colour) {
        this.embed = new MessageEmbed({
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
        this.file = new MessageAttachment( thumbDir + `${legend.name}.png` );
    };
};
