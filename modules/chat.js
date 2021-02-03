// Core Twitch connection features.
const core = require('./core');
// Users Helper
const User = require('../helpers/user');
// Helpers
const { isUserInList, userIndexInList, getUserFromUsername } = require('../helpers/helpers');

// Commands module.
const commands = require('./commands');
// Insult timer module.
const insultTimer = require('./insultTimer');
// Whisper Module
const whispers = require('./whispers');
// Comebacks module.
const comebacks = require('./comebacks');
// Runtime array of Users in chat.
const allUsersInChat = [];

// Listener for normal chat messages.
core.client.on('message', (channel, tags, message, self) => 
{
    // Don't listen to my own messages or commands..
    if (self || message.startsWith('!')) return;

    // Update last message timestamp
    const userIndex = userIndexInList(tags.username, allUsersInChat);
    if(userIndex >= 0)
    {
        allUsersInChat[userIndex].updateLastMessageTime();
    }
    else
    {
        // Add a new user to the list.
        addUserToViewerList(tags.username);
    }

    //---- Add functions here for things that need to listen to chat messages. ----//

    // Insult Timer listener.
    insultTimer.onMessage(channel, tags, message);

    // Comebacks listener.
    comebacks.onMessage(channel, tags, message);
});

// Listener for commands.
core.client.on('message', (channel, tags, message, self) => 
{
    // Don't listen to my own messages or normal messages..
    if (self || !message.startsWith('!')) return;

    const userIndex = userIndexInList(tags.username, allUsersInChat);
    if(userIndex < 0)
    {
        addUserToViewerList(tags.username);
    }


    // TODO: Check ignore list for people that can't use the bot.
    

    // Add functions here that need to listen to commands.
    commands.onCommand(channel, tags, message);
});

// Listener for people joining the channel.
core.client.on('join', (channel, username, self) => 
{
    if (self) return;

    // Add all users who join to the viewer list.
    addUserToViewerList(username);
});

// Listener for people leaving the channel.
core.client.on('part', (channel, username, self) =>
{
    if (self) return;

    // Call the listener for the insultTimer module.
    // insultTimer.onPart(channel, username);

    // Remove users from the viewer list when they leave the channel.
    removeUserFromViewerList(username);
});

// Start insults when logging into the channel.
core.client.on("logon", () => 
{
    // Start up the timer to insult people.
    require('./insultTimer').startInsultTimer();
});

// Listener for whispers.
core.client.on("whisper", (from, userstate, message, self) => 
{
    // Don't listen to my own messages..
    if (self) return;

    // Add functions here that need to listen to whispers.
    whispers.onWhisper(from, userstate, message, self);
});



// Add users to allUsersInChat.
function addUserToViewerList (username)
{
    // Check to see if this user isnt in the list.
    if(!isUserInList(username, allUsersInChat))
    {
        // Push the new user into the list.
        const newUser = new User(username);
        // newUser.updateLastMessageTime();
        allUsersInChat.push(newUser);
        // console.log(`Pushed ${username} into allUsersInChat list.`, );
        return newUser;
    }
}

// Remove users from allUsersInChat.
function removeUserFromViewerList (username)
{
    if(isUserInList(username, allUsersInChat))
    {
        const partedUserIndex = userIndexInList(username, allUsersInChat);
        allUsersInChat.splice(partedUserIndex);
        console.log(`CONSOLE: Removed ${username} from allUsersInChat at index ${partedUserIndex}.`);
    }
}

function getInsultableUsers ()
{
    const insultableUsers = [];
    allUsersInChat.map((value) => {
        if(value.checkInsultability())
        {
            insultableUsers.push(value);
        }
    }); 
    return insultableUsers;
}

//#region Chat helpers 

// Used to check to see if the given user is a mod or owner of the channel.
function isMod (props)
{
    if(props.tags.mod || props.channel.includes(props.tags.username))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function formatInsult(chatMessage, userReplacement, channelReplacement)
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

function formatUsername (username)
{
    let name = username.toLowerCase();

    if(name.startsWith('@'))
    {
        name = name.substring(1);
    }

    return name;
}
//#endregion

module.exports = {
    allUsersInChat,
    isMod,
    formatInsult,
    formatUsername,
    getInsultableUsers
};
