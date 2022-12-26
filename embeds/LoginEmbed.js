import loginQuote from '../utils/loginQuote.js';

export default class LoginEmbed {
    constructor (client) {
        this.description = loginQuote,
        this.timestamp = new Date(),
        this.footer = {
            text: `Logged in as ${client.user.tag}`,
            icon_url: client.user.avatarURL()
                ? client.user.avatarURL()
                : undefined,
        };
    };
};
