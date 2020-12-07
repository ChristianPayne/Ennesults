// Viewer Tracking
// Target Tracking
// Chat Helper Functions

// Other Scripts
const core = require('./core.js');
const {ignoreList, consenters} = require('./files.js');
const {commands, onCommand} = require('./commands.js');
const allUsersInChat = [];

// Listener for normal chat messages.
core.client.on('message', (channel, tags, message, self) => 
{
    // Don't listen to my own messages or commands..
    if (self || message.startsWith('!')) return;

    // Add functions here for things that need to listen to chat messages.

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

// Listener for whispers. TODO: Add whisper functionality
core.client.on("whisper", (from, userstate, message, self) => 
{
    // Don't listen to my own messages..
    if (self) return;
});

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

// // Start insults when logging into the channel.
// client.on("logon", () => 
// {
//     startInsultTimer();
// });

// // Adding people the lists when they join the channel.
// client.on('join', (channel, username, self) => 
// {
//     addUserToViewerList(username);

//     addUserToInsultList(username);
// });

// // Remove people from lists when they leave the channel.
// client.on('part', (channel, username, self) =>
// {
//     let partedUserIndex = allUsersInChat.indexOf(username);

//     if(partedUserIndex != -1)
//     {
//         allUsersInChat.splice(partedUserIndex);
//         console.log(`CONSOLE: Removed ${username} from allUsersInChat.`);
//     }
    
// });

module.exports = {allUsersInChat ,checkInsultability, isMod, consenters};
