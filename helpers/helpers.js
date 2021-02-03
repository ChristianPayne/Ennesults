module.exports = 
{
    isUserInList : (username, list) => 
    {
        return list.some((value) => {
            if(value.getUsername().toLowerCase() == username.toLowerCase())
            {
                return true;
            }
        });
    },
    userIndexInList : (username, list) =>
    {
        let foundIndex = -1;
        list.some((value, index) => {
            if(value.getUsername().toLowerCase() == username.toLowerCase())
            {
                foundIndex = index;
            }
        });
        return foundIndex;
    },
    getUserFromUsername : (username) => {
        const { allUsersInChat } = require('../modules/chat');
        const { userIndexInList } = require('./helpers');
        const userIndex = userIndexInList(username, allUsersInChat);
        if(userIndex >= 0)
        {
            return allUsersInChat[userIndex];
        }
        else
        {
            console.log(`User ${username} not found in list.`);
            return null;
        }
    },
    replaceChatVariables : (chatMessage, userReplacement, channelReplacement) =>
    {
        let modifiedText = chatMessage;
        if(chatMessage.includes('{user}'))
        {
            // console.log('Replaced {user} for username.');
            modifiedText = modifiedText.replace(/{user}/g, `@${userReplacement}`);
        }
        if(chatMessage.includes('{channel}'))
        {
            // console.log('Replaced {channel} for channel.');
            modifiedText = modifiedText.replace(/{channel}/g, `@${channelReplacement}`);
        }
        return(modifiedText);
    }
}