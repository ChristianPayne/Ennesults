// TODO: Integrate this.
const correctionOverrides = require('../files/correction_overrides.json');
const settings = require('../files/settings.json');
const { getUserFromUsername } = require('../helpers/helpers');
// 'en' correction
function onMessage(_channel, tags, message, self)
{
    if(self || message.startsWith('!')) return;

    // checkInsultability(tags.username)

    // Check to see if the user is insultable.
    if(!getUserFromUsername(tags.username).checkInsultability()) return;
    
    if(message.toLowerCase().includes('en'))
    {
        // Check to make sure we don't need to ignore this word.
        for (const correctionOverride of correctionOverrides)
        {
            if(message.toLowerCase().includes(correctionOverride))
            {
                return console.log("CONSOLE: " + correctionOverride + " was flagged.");
            }
        }

        // Calculate a percentage of corrections.
        let randomNum = Math.random();
        if(randomNum <= settings.enCorrectionPercentage)
        {
            const { chat } = require('../modules/core');
            const correctedMessage = message.toLowerCase().replace("en", "ENNE");
            chat(`Correction: *${correctedMessage}*`);
        }
        else
        {
            console.log("CONSOLE: Skipping 'en' correction.");
        }
    }
}

function addCorrectionOverride(keyword)
{
    if(!correctionOverrides.includes(keyword.toLowerCase()))
    {
        correctionOverrides.push(keyword.toLowerCase());
        fs.writeFile('./Assets/correction_overrides.json', JSON.stringify(correctionOverrides), (error)=>
        {
            error ? console.log("ERROR" + error) : console.log('CONSOLE: Saved correction overrides to file.');
        });
    }
    else
    {
        chat("/me Override already added.");
    }
}

module.exports = { onMessage };