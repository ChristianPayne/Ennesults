// Basic requirements
const Command = require('./command.js');
// Custom requirements


class Test extends Command
{

    constructor() {
        super('test', []);
        this.setDescription('This is a description for a test command.');
    }

    execute (args, props)
    {
        super.execute();
        console.log(JSON.stringify(require('../modules/chat').allUsersInChat));
    }
}

module.exports = Test;