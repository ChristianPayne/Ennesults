// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class AddEnnesults extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('addennesult', ['ae']);
        this.needsMod = true;
        this.setDescription('!addennesult <Ennesult> will add the ennesult to the bot.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        const { insults } = require("../modules/files.js").files;
        const { saveJSONFile } = require("../modules/files.js");

        if(!props.argsString)
        {
            this.chat('/me Ennesult can not be empty.');
            return;
        }

        if(!insults.includes(props.argsString))
        {
            insults.push(props.argsString);
            saveJSONFile('./files/insults.json', insults);
            this.chat(`/me Ennesult added: ${props.argsString}`);
        }
        else
        {
            this.chat("/me That ennesult has already been added.");
        }
    }
}

module.exports = AddEnnesults;