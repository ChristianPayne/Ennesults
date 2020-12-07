// Basic requirements
const Command = require('./command.js');
// Custom requirements


class Test extends Command
{

    constructor() {
        super('test', ['alias']);
        this.setDescription('This is a description for a test command.');
    }

    execute (args, props)
    {
        super.execute();
        this.chat("This is a test of the test command.");
    }
}

module.exports = Test;