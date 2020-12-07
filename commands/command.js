const chat = require('../modules/core').chat;

class Command
{
    constructor(name, aliases = [])
    {
        this.name = name;
        this.aliases = aliases;
        this.description = `No description set for !${this.name}.`;
        this.needsMod = false;
        // console.log(`New ${name} command instantiated with aliases [${aliases}]`);
    }

    setDescription (description)
    {
        this.description = `!${this.name} | ${description}`
    }

    isCommandOrAlias (commandName)
    {
        if(commandName == this.name) return true;

        if(this.aliases.includes(commandName)) return true;

        return false;
    }

    execute ()
    {
        console.log(`COMMAND: Executing command '${this.name}'`);
    }

    chat (message)
    {
        chat(message);
    }
}

module.exports = Command;