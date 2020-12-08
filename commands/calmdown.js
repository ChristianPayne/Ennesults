// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Calmdown extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('calmdown', []);
        this.needsMod = false;
        this.setDescription('Tell the bot to stop insulting people.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        require('../modules/insultTimer').stopInsultTimer();
    }
}

module.exports = Calmdown;