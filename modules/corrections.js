// TODO: Integrate this.
// 'en' correction
function onMessage(_channel, tags, message)
{
    if(self || message.startsWith('!') || checkInsultability(tags.username)) return;
    
    if(message.toLowerCase().includes('en'))
    {
        let skip = false;
        // Check to make sure we don't need to ignore this word.
        correctionOverrides.forEach(element => {
            if(message.toLowerCase().includes(element))
            {
                console.log("CONSOLE: " + element + " was flagged.");
                skip = true;
            }
        });

        if(skip)
        {
            return;
        }

        let randomNum = Math.random();
        if(randomNum <= settings.enCorrectionPercentage)
        {
            let correctedMessage = "";
            correctedMessage = message.toLowerCase().replace("en", "ENNE");
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