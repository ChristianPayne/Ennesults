// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Stats extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('stats');
        this.needsMod = false;
        this.setDescription('Displays the current numbers of insults, comebacks and people in chat who can be insulted.');
    }

    // Executes command when called.
    execute (args, props)
    {
        const { insults, comebacks } = require('../modules/files').files;
        const { insultTargets } = require('../modules/chat');

        super.execute();

        this.chat(`There are ${insults.length} ennsults, ${comebacks.length} comebacks and ${insultTargets.length} targets.`);
    }
}

module.exports = Stats;