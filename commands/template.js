// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Template extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('commandName', ['aliases']);
        this.needsMod = false;
        this.setDescription('Description template.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();
    }
}

module.exports = Template;