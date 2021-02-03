// Basic requirements
const Command = require('./command.js');
// Custom requirements


class Test extends Command
{

    constructor() {
        super('test');
        this.setDescription('This is a description for a test command.');
    }

    execute (args, props)
    {
        super.execute();
        const { allUsersInChat } = require('../modules/chat');
        const { userIndexInList } = require('../helpers/helpers');

        const currentInsultableUsers = allUsersInChat;
        const userIndex = userIndexInList(props.tags.username, currentInsultableUsers);
        console.log(allUsersInChat);
        // if(userIndex >= 0)
        // {
        //     console.log(currentInsultableUsers[userIndex]);
        // }
    }
}

module.exports = Test;