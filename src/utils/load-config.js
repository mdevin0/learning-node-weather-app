const fs = require('fs');
const path = require('path');

const CONFIG_FILEPATH = path.join(__filename, '..', '..', 'secret', 'config.json');

const loadConfig = () => {
    try {
        const file = fs.readFileSync(CONFIG_FILEPATH);
        return JSON.parse(file.toString());
    } catch(e) {
        console.error("Error loading config file.");
        console.error(e);
    }
    
}

module.exports = loadConfig;