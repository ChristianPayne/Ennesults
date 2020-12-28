// Core Twitch connection features.
const core = require('./core');
// Users Helper
const User = require('../helpers/user');
// Arrays from files.
const {ignoreList, consenters} = require('../helpers/files').files;



// Commands module.
const commands = require('./commands');
// Insult timer module.
const insultTimer = require('./insultTimer');
// Files Module
const files = require('../helpers/files');
// Whisper Module
const whispers = require('./whispers');
// Lurkers Module
const lurkers = require('./lurkers');
// Runtime array of users in chat.
const allUsersInChat = [];
// Runtime array of insult targets.
const insultTargets = [];

// Listener for normal chat messages.
core.client.on('message', (channel, tags, message, self) => 
{
    // Don't listen to my own messages or commands..
    if (self || message.startsWith('!')) return;

    // Add functions here for things that need to listen to chat messages.
    insultTimer.onMessage(channel, tags, message);

    lurkers.onMessage(channel, tags, message);
});

// Listener for commands.
core.client.on('message', (channel, tags, message, self) => 
{
    // Don't listen to my own messages or normal messages..
    if (self || !message.startsWith('!')) return;

    // TODO: Check ignore list for people that can't use the bot.
    

    // Add functions here that need to listen to commands.
    commands.onCommand(channel, tags, message);
});

// Listener for people joining the channel.
core.client.on('join', (channel, username, self) => 
{
    if (self) return;

    // Call the listener for the insultTimer module.
    insultTimer.onJoin(channel, username);

    // Add all users who join to the viewer list.
    addUserToViewerList(username);
});

// Listener for people leaving the channel.
core.client.on('part', (channel, username, self) =>
{
    if (self) return;

    // Call the listener for the insultTimer module.
    insultTimer.onPart(channel, username);

    // Remove users from the viewer list when they leave the channel.
    removeUserFromViewerList(username);
    
});

// Start insults when logging into the channel.
core.client.on("logon", () => 
{
    // Start up the timer to insult people.
    require('./insultTimer').startInsultTimer();
});

// Listener for whispers. TODO: Add whisper functionality
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
    if(!allUsersInChat.some((value) => {
        if(value.getUsername() === username)
        {
            return true;
        }
    }))
    {
        // Push the new user into the list.
        allUsersInChat.push(new User(username));
        console.log(`Pushed ${username} into list.`);
    }
    // if(!allUsersInChat.includes(username))
    // {
    //     allUsersInChat.push(username);
    // }
}

// Remove users from allUsersInChat.
function removeUserFromViewerList (username)
{
    let partedUserIndex = allUsersInChat.indexOf(username);
    if(partedUserIndex != -1)
    {
        allUsersInChat.splice(partedUserIndex);
        console.log(`CONSOLE: Removed ${username} from allUsersInChat.`);
    }
}

//#region Chat helpers
function checkInsultability (username)
{
    const lcUsername = username.toLowerCase();
    const lurkers = require('./lurkers').getLurkers();
    // TODO: Add lurkers here when we get to that. 
    
    if([...ignoreList, ...lurkers].includes(lcUsername))
    {
        console.log(`CONSOLE: ${username} is on the ignore list.`);
        return false;
    }

    if(![...consenters, ...insultTargets].includes(lcUsername))
    {
        return false;
    }

    return true;
}

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
    insultTargets,
    consenters,
    isMod,
    checkInsultability,
    formatInsult,
    formatUsername
};
