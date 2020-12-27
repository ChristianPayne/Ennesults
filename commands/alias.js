// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Alias extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('alias');
        this.needsMod = false;
        this.setDescription('Lists the aliases of the given command.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        const commands = require('../modules/commands.js');
        const commandFound = false;

        // Loops over command keys that are active and are finds the one that matches the args.
        commands.getCommandKeys().forEach((value, index) => 
        {
            if(value.toLowerCase() == args[0].toLowerCase())
            {
                let aliases = `${value} aliases are:`;
                commands.commands[value].getAliases().forEach((value, index) => {
                    aliases += ` '${value}'`
                })
                aliases += '.';
                this.chat(aliases);
                commandFound = true;
                return;
            }           
        });

        if(!commandFound)
        {
            this.chat(`Could not find the order, ${args[0]}.`);
        }
    }
}

module.exports = Alias;