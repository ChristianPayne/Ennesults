// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Reply extends Command
{

    // Name command and aliases in params or super params. 
    constructor(name, aliases, response) {
        super(name, aliases);
        this.needsMod = false;
        this.setDescription('Just for fun.');

        this.response = response;
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        this.chat(this.response);
    }
}

module.exports = Reply;