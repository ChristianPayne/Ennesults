// Basic requirements
const Command = require('./command.js');
// Custom requirements

// Extends from the base Command class.
class Help extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('help', ['h']);
        this.setDescription('!help <command name> tells you about what the specified command does.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        const commands = require('../modules/commands.js').commands;
        const keys = Object.keys(commands);

        // Loop through the keys.
        for (let i = 0; i < keys.length; i++) 
        {
            // If we have no args, give the description of this command.
            if(!args.length > 0)
            {
                this.chat(`${this.description}`);
                break;
            }

            // Find a match of the arg and chat the description.
            if(args[0] === commands[keys[i]].name)
            {
                this.chat(commands[keys[i]].description);
                return;
            }
        }

        this.chat('/me Could not find that command.');
    }
}

module.exports = Help;