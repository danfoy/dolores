export default class Trigger {
    constructor(meta, patterns, response) {
        this.name = meta.name;
        this.description = meta.description;
        this.patterns = patterns;
        this._response = response;
    };

    async respond(message) {
        try {
            await this._response(message);
            console.log(
                `[${this.name}] triggered by ${message.author.tag} ` +
                `in ${message.guild.name}#${message.channel.name}`
            );
        } catch (error) {
            throw new Error(`Trigger ${this.name} failed:`, {cause: error});
        };
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
