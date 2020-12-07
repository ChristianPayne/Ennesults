// Basic requirements
const Command = require('./command.js');
// Custom requirements


class SimpleChat extends Command
{
    constructor() {
        super('chat', ['sc']);
    }

    execute (args, properties)
    {
        super.execute(args, properties);
        this.chat('This is a simple chat.');
    }
}

module.exports = SimpleChat;