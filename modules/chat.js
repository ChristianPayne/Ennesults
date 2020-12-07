// Viewer Tracking
// Target Tracking
// Chat Helper Functions

const core = require('./core.js');
const {ignoreList, consenters} = require('./files.js');
const {commands, onCommand} = require('./commands.js');
const { onMessage } = require('./insultTimer.js');
const allUsersInChat = [];
const insultTargets = [];
const lurkers = [];

// Listener for normal chat messages.
core.client.on('message', (channel, tags, message, self) => 
{
    // Don't listen to my own messages or commands..
    if (self || message.startsWith('!')) return;

    // Add functions here for things that need to listen to chat messages.
    onMessage(channel, tags, message);
});

// Listener for commands.
core.client.on('message', (channel, tags, message, self) => 
{
    // Don't listen to my own messages or normal messages..
    if (self || !message.startsWith('!')) return;

    // TODO: Check ignore list for people that can't use the bot.
    

    // Add functions here that need to listen to commands.
    onCommand(channel, tags, message);
});

// Listener for people joining the channel.
core.client.on('join', (channel, username, self) => 
{
    // addUserToViewerList(username);

    // addUserToInsultList(username);
});

// Listener for people leaving the channel.
core.client.on('part', (channel, username, self) =>
{
    // let partedUserIndex = allUsersInChat.indexOf(username);

    // if(partedUserIndex != -1)
    // {
    //     allUsersInChat.splice(partedUserIndex);
    //     console.log(`CONSOLE: Removed ${username} from allUsersInChat.`);
    // }
    
});

// Start insults when logging into the channel.
core.client.on("logon", () => 
{
    // startInsultTimer();
});

// Listener for whispers. TODO: Add whisper functionality
core.client.on("whisper", (from, userstate, message, self) => 
{
    // Don't listen to my own messages..
    if (self) return;

    // Add functions here that need to listen to whispers.
    
});


function addUserToViewerList (username)
{
    if(!allUsersInChat.includes(username))
    {
        allUsersInChat.push(username);
    }
}

//#region Chat helpers
function checkInsultability (username)
{
    const lcUsername = username.toLowerCase();
    
    // TODO: Add lurkers here when we get to that. 
    if ([ignoreList].some((arr) => arr.includes(lcUsername))) 
    {
        console.log(`CONSOLE: ${username} is on the ignore list.`);
        return false;
    } 
    if ([consenters, insultTargets].some((arr) => !arr.includes(lcUsername))) 
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

function replaceChatVariables(chatMessage, userReplacement, channelReplacement)
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
//#endregion

module.exports = {allUsersInChat ,checkInsultability, isMod, consenters};
