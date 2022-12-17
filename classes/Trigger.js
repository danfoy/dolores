async function attemptResponse(trigger, message) {
    try {
        await trigger._response(message);
        console.log(
            `[${trigger.name}] triggered by ${message.author.tag} ` +
            `in ${message.guild.name}#${message.channel.name}`
        );
    } catch (error) {
        throw new Error(`Trigger ${trigger.name} failed:`, {cause: error});
    };
};

module.exports = class Trigger {
    constructor(meta, patterns, response) {
        this.name = meta.name;
        this.description = meta.description;
        this.patterns = patterns;
        this._response = response;
    };

    async respond(message) {
        await attemptResponse(this, message);
    };

    isMatch(messageContent) {
        let matchFound = false;
        this.patterns.forEach(pattern => {
            if (messageContent.match(pattern)) matchFound = true;
        });
        if (matchFound) return true;
        return false;
    };
};
