// Modules
let files = require("./modules/files");
let core = require("./modules/core");
let chat = require("./modules/chat");
let commands = require('./modules/commands');
let insultTimer = require('./modules/insultTimer');


//#region Commands

// Look for commands OLD
// core.client.on('message', (channel, tags, message, self) => 
// {
    // const {username} = tags;
    
    // if(self) return;
    
    // As soon as someone types, check to see if they are inside of the insult list.
    // addUserToViewerList(username);
    // addUserToInsultList(username);
    // removeLurker(username);
// });
// List of all commands that can be run.

//#endregion

//#region Bot functionality


/*
function addToIgnoreList (username)
{
    username = username.toLowerCase();

    if(username.startsWith('@'))
    {
        username = username.substring(1);
    }

    if(ignoreList.includes(username))
    {
        console.log(`CONSOLE: ${username} is already in the ignore list.`);
        chat(`/me ${username} has already been added to the ignore list.`);
    }
    else
    {
        ignoreList.push(username);
        saveIgnoreFile();
        removeFromInsultList(username);
        chat(`/me ${username} has been added to the ignore list.`);
    }
    
}

function removeFromIgnoreList (username)
{
    username = username.toLowerCase();

    if(username.startsWith('@'))
    {
        username = username.substring(1);
    }

    let removedIgnoreIndex = ignoreList.indexOf(username);

    if(removedIgnoreIndex !== -1)
    {
        ignoreList.splice(removedIgnoreIndex, 1);
        saveIgnoreFile();
        chat(`/me ${username} successfully removed from ignore list.`);
    }
    else
    {
        chat(`/me Could not find ${username} in the list of ignored users.`);
    }
}

function removeLurker (username)
{
    let removedLurkerIndex = lurkers.indexOf(username);

    if(removedLurkerIndex !== -1)
    {
        lurkers.splice(removedLurkerIndex, 1);
    }
    else
    {
        // console.log(`${username} was not found in the lurkers list.`);
    }
}
*/

//#endregion

//#region Experimental


// Was testing some notice functionality.
// client.on("notice", (channel, msgid, message) => {
//     // Do your stuff.
//     console.log(msgid);
//     if(msgid == 'color_changed')
//     {
//         // chat('Color changed successfully.');
//     }
// });


//#endregion
