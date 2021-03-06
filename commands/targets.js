// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Targets extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('targets', ['t']);
        this.needsMod = false;
        this.setDescription('Displays the current targets that the bot can insult.');
    }

    // Executes command when called.
    execute (args, props)
    {
        const { getInsultableUsers } = require('../modules/chat');
        const insultTargets = getInsultableUsers().map((value) => { return value.getUsername(); }); 
        super.execute();

        if(insultTargets.length > 0)
        {
            // TODO: Make formatting nice for this.
            this.chat(`@${props.tags.username} Current targets are: ${insultTargets}`);
        }
        else
        {
            this.chat(`@${props.tags.username} There are no current targets.`);
        }
    }
}

module.exports = Targets;