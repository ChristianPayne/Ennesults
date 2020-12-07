// Basic requirements
const Command = require('./command.js');
// Custom requirements

// Extends from the base Command class.
class Template extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('commandName', ['aliases']);
        this.setDescription('Description template.');
        this.needsMod = false;
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();
    }
}

module.exports = Template;