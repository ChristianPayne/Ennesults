// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Lurkers extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('lurkers', []);
        this.needsMod = false;
        this.setDescription('Displays all the lurkers in chat.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        const { allUsersInChat } = require('../modules/chat');

        const lurkersList = allUsersInChat.filter((value) => {return value.getIsLurking()});

        const lurkerNames = lurkersList.map((value)=> {return value.getUsername()});

        if(lurkerNames.length >= 0)
        {
          this.chat(`${lurkerNames.join(', ')} are lurking!`);
        }
        else
        {
          this.chat('No one seems to be lurking.');
        }
        // console.log(lurkersList);
    }
}

module.exports = Lurkers;