// Basic requirements
const Command = require('./command.js');
// Custom requirements
const { consenters } = require('../helpers/files').files;
const { saveJSONFile } = require('../helpers/files');
const { isMod } = require('../modules/chat');
const { userIndexInList } = require('../helpers/helpers.js');

class Consent extends Command
{
    // Command base
    constructor() {
        super('consent', ['c']);
        this.setDescription('Gives consent for the bot to interact with you.');
    }

    execute (args, props)
    {
        super.execute(args, props);

        let consentTarget;
        if(args[0] !== undefined)
        {
            // Check to see if the command was sent from a mod to change the consent of someone else.
            if(isMod(props))
            {
                if(args[0].startsWith('@'))
                {
                    consentTarget = args[0].substring(1).toLowerCase();
                }
                else
                {
                    consentTarget = args[0].toLowerCase();
                }
            }
            else
            {
                this.chat(`/me Consenting for someone else needs mod permissions.`);
                return;
            }
        }
        else
        {
            consentTarget = props.tags.username;
        }

        
        if(!consenters.includes(consentTarget))
        {
            consenters.push(consentTarget);
            saveJSONFile("./files/consenters.json", consenters);
            this.chat(`/me ${consentTarget} has consented.`);

            const { allUsersInChat } = require('../modules/chat');
            const userIndex = userIndexInList(consentTarget, allUsersInChat);
            if(userIndex >= 0)
            {
                allUsersInChat[userIndex].isConsented = true;
            }
        }
        else
        {
            this.chat(`/me @${consentTarget} has already given consent.`);
        }
    }
}

module.exports = Consent;