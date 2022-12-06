const loginQuote = require('./LoginQuote');

module.exports = (client) => {
    return {
        // title: "Dolores client loaded",
        description: loginQuote,
        timestamp: new Date(),
        footer: {
            text: `Logged in as ${client.user.tag}`,
            icon_url: client.user.avatarURL()
                ? client.user.avatarURL()
                : undefined,
        },
    };
};

