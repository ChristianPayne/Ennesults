const chat = require('../modules/core').chat;

class Command
{
    constructor(name, aliases = [])
    {
        this.name = name;
        this.aliases = aliases;
        this.needsMod = false;
        this.description = `No description set for !${this.name}.`;
        // console.log(`New ${name} command instantiated with aliases [${aliases}]`);
    }

    // Set the description depending of if it needs mod or not.
    setDescription (description)
    {
        if(this.needsMod)
        {
            this.description = `!${this.name} | Requires mod privileges. | ${description}`;
        }
        else
        {
            this.description = `!${this.name} | ${description}`;
        }
    }

    // Return current description.
    getDescription ()
    {
        return this.description;
    }

    // Return current aliases.
    getAliases ()
    {
        return this.aliases;
    }

    // Returns true of the given string is part of the name or alias list.
    isCommandOrAlias (commandName)
    {
        if(commandName == this.name) return true;

        if(this.aliases.includes(commandName)) return true;

        return false;
    }

    // Logging that the base command was called.
    execute ()
    {
        console.log(`COMMAND: Executing command '${this.name}'`);
    }

    // This is in here so we don't need to reference core.js just to chat in every command.
    chat (message)
    {
        chat(message);
    }
}

module.exports = Command;