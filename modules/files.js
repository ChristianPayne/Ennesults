const fs = require('fs');
const files =
{
    settings : JSON.parse(fs.readFileSync('./files/settings.json')),
    consenters : JSON.parse(fs.readFileSync('./files/consenters.json')),
    insults : JSON.parse(fs.readFileSync('./files/insults.json')),
    correctionOverrides : JSON.parse(fs.readFileSync('./files/correction_overrides.json')),
    colors : JSON.parse(fs.readFileSync('./files/colors.json')),
    comebacks : JSON.parse(fs.readFileSync('./files/comebacks.json')),
    ignoreList : JSON.parse(fs.readFileSync('./files/ignore.json')),
    insultTargets : []
}

function saveJSONFile (filePath, content)
{
    fs.writeFile(filePath, JSON.stringify(content), (error) => {
        if(error)
        {
            console.log('ERROR: File write error! | ' + filePath + " | " + error);
        }
        else
        {
            console.log('CONSOLE: File write confirmed. | ' + filePath);
        }
    });
}

module.exports = {files, saveJSONFile}