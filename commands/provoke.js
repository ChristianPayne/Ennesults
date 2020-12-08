// Basic requirements
const Command = require('./command.js');
// Command requirements
const { sayRandomInsult } = require('../modules/insultTimer');

// Extends from the base Command class.
class Provoke extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('provoke', ['p']);
        this.needsMod = false;
        this.setDescription('Provokes Ennesults to insult a random person or, optional, targeted person.');
    }

    // Executes command when called.
    execute (args, props)
    {
        const { formatUsername } = require('../modules/chat');
        super.execute();

        let insultsToSend = 3
        let insultsSent = 0;
        sayRandomInsult(formatUsername(args[0]));
        // let timer = setInterval(()=>{
        //     sayRandomInsult();
        //     if(insultsSent < 3)
        //     {
        //         clearInterval(timer);
        //         insultsSent = 0;
        //     }
        //     insultsSent++;
        // },3000);

        // if(!insultInterval)
        // {
        //     startInsultTimer();
        // }
    }
}

module.exports = Provoke














