// Basic requirements
const { lchown } = require('fs');
const Command = require('./command.js');

// Extends from the base Command class.
class Lurk extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('lurk');
        this.needsMod = false;
        this.setDescription('Sets you to lurk so the bot doesn\'t interact with you.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        const { getInsultableUsers } = require('../modules/chat');
        const { userIndexInList } = require('../helpers/helpers');

        const currentInsultableUsers = getInsultableUsers();
        const userIndex = userIndexInList(props.tags.username, currentInsultableUsers);
        if(userIndex >= 0)
        {
            currentInsultableUsers[userIndex].setIsLurking();
            // console.log(currentInsultableUsers[userIndex]);
            this.chat('Fine, leave anyway.');
        }
        else
        {
            console.log("Insult list is empty.");
        }
    }
}

module.exports = Lurk;