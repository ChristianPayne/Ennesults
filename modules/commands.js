// Requirements
const Test = require("../commands/test");
const Consent = require("../commands/consent");
const Orders = require("../commands/orders");
const Help = require("../commands/help");
const RevokeConsent = require("../commands/revokeconsent");
const Color = require("../commands/color");
const AddEnnesult = require("../commands/addennesult");
const RemoveEnnesult = require("../commands/removeennesult");
const Provoke = require("../commands/provoke");
const Calmdown = require("../commands/calmdown");
const Targets = require("../commands/targets");
const Reply = require("../commands/reply");
const Stats = require("../commands/stats");
const Alias = require("../commands/alias");
const Lurk = require("../commands/lurk");

// A list of all commands that are currently available.
const commands = {
    Orders : new Orders(),
    Help : new Help(),
    Consent : new Consent(),
    RevokeConsent : new RevokeConsent(),
    Color : new Color(),
    AddEnnesult : new AddEnnesult(),
    RemoveEnnesult : new RemoveEnnesult(),
    // Provoke : new Provoke(),
    // Calmdown : new Calmdown(),
    Targets : new Targets(),
    Lurk : new Lurk(),
    Mukbang : new Reply('mukbang', [], 'Mukbang!'),
    Bang : new Reply('bang', [''], 'BANG!'),
    // Stats : new Stats(),
    Alias : new Alias(),
    Test : new Test(),
}

// Get all of the keys for our commands.
function getCommandKeys () { return Object.keys(commands); }

// Is called from the listener.
function onCommand (channel, tags, message)
{
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    const argsString = args.join(' ');

    const props = {
        channel : channel,
        args : args,
        command : command,
        message : message,
        tags : tags,
        argsString : argsString
    }

    // Execute the command.
    executeCommand(command, args, props);
}

// Find and execute the command.
function executeCommand (name, args, props)
{
    const { isMod } = require("./chat");
    const { chat } = require('./core')

    // Loop over all the keys in the commands object.
    getCommandKeys().forEach((value, index) =>
    {
        // Check to see if that command matches.
        if(commands[value].isCommandOrAlias(name))
        {
            // This command needs mod but the user doesn't have it.
            if(commands[value].needsMod && !isMod(props))
            {
                chat(`!${value} needs moderator permissions to be used.`);
                return;
            } 

            // Execute commands[value] and pass the args and message properties.
            commands[value].execute(args, props);
        }
    });
}

// Warn if names or aliases are the same.
getCommandKeys().forEach((value1) => {
    for (let i = 0; i < getCommandKeys().length; i++) 
    {
        // If we are comparing the same things then skip this iteration.
        if(value1 === getCommandKeys()[i]) continue;

        // Check to see if the names are the same.
        if(commands[getCommandKeys()[i]].isCommandOrAlias(commands[value1].name))
        {
            // Log a warning so we know if there is a duplicate.
            console.log(`WARNING: ${value1} is the same name as ${getCommandKeys()[i]}`);
        }

        // Check to see if the aliases are the same.
        for (let x = 0; x < commands[getCommandKeys()[i]].aliases.length; x++) 
        {
            if(commands[getCommandKeys()[i]].isCommandOrAlias(commands[value1].aliases[x]))
            {
                console.log(`WARNING: ${value1} has the same alias as ${commands[getCommandKeys()[i]].name}`);
            }
        }
    }
});

    // const {username} = messageProperties.tags;

    // switch (name)
    // {

    //     case 'ao':
    //     case 'addoverride':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 addCorrectionOverride(args[0]);
    //                 chat('/me Override added.');
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to add an override.');
    //             }
    //             break;
    //         }

    //     case 'ac':
    //     case 'addcomeback':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 addComebackAndSave(args.join(' '));
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to add a comeback.');
    //             }
    //             break;
    //         }
        
    //     case 'ai':
    //     case 'addignore':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 addToIgnoreList(args[0]);
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to add to the ignore list.');
    //             }
    //             break;
    //         }

    //     case 'ri':
    //     case 'removeignore':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 removeFromIgnoreList(args[0]);
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to remove from the ignore list.');
    //             }
    //             break;
    //         }

    //     case 'stats':
    //         {
    //             chat(`There are ${insults.length} ennsults, ${comebacks.length} comebacks and ${insultTargets.length} targets.`);
    //             break;
    //         }

    //     case 'lurk':
    //         {
    //             setTimeout(() => 
    //             {
    //                 if(!lurkers.includes(username))
    //                 {
    //                     lurkers.push(username);
    //                     console.log(`CONSOLE: Pushed ${username} into the lurkers array.`);
    //                 }
    //                 else
    //                 {
    //                     console.log(`CONSOLE: ${username} has already been added to the lurkers array.`);
    //                 }
    //             }, settings.lurkTimer);
    //             break;
    //         }

    //     default:
    //             break;
    // }


module.exports = {
    executeCommand,
    commands,
    onCommand,
    getCommandKeys
}