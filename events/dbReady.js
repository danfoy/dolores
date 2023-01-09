import Event from '../classes/Event.js';
import loginQuote from '../utils/loginQuote.js';
import os from 'node:os';
import { send } from 'node:process';

const meta = {
    name: 'dbReady',
    once: true,
};

export class LoginEmbed {
    constructor(client) {
        this.title = loginQuote,
        // this.description = `New instance of ${client.user.username}`;
        this.timestamp = new Date(),
        this.footer = {
            text: `${client.user.tag} on ${os.hostname}`,
            icon_url: client.user.avatarURL()
                ? client.user.avatarURL()
                : undefined,
        };
    };
};

export class LoginMessage {
    constructor(client) {
        this.embeds = [new LoginEmbed(client)];
    };
};

async function sendLoginMessages(client) {
    const logChannels = client.db.channelsByTag('startupLog');

    if (!logChannels)
        return console.log('No startup log channels found');

    const loginMessage = new LoginMessage(client);
    let sent = [];

    for await (const logChannel of logChannels) {
        const channel = await logChannel.fetch();

        try {
            await channel.send(loginMessage);
            sent.push(`[${channel.guild.name}#${channel.name}]`);
        } catch (error) {
            console.error(
                `Unable to send startup log to ` +
                `[${channel.guild.name}#${channel.name}]: ${error.message}`
            );
        };
    };

    if (!sent.length)
        return;

    return console.log(
        `Sent ${sent.length} startup ` +
        `${sent.length == 1 ? 'log' : 'logs'}:\t` +
        `${sent.join(', ')}`
    );
};

async function action(client) {
    await sendLoginMessages(client);
    console.log('Database ready');
};

export default new Event(meta, action);
