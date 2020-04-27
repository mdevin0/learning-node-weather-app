const request = require('postman-request');

const loadConfig = require('./load-config.js');

let base_url;
let key;

if(process.env.MAPBOX_GEOCODE_BASE_URL && process.env.MAPBOX_KEY){
    base_url = process.env.WEATHERSTACK_BASE_URL;
    key = process.env.WEATHERSTACK_KEY;
    console.log('Loading weatherstack variables from environment.');
} else {
    const config = loadConfig();
    base_url = config.weatherstack_base_url;
    key = config.weatherstack_key;
    console.log('Loading weatherstack variables from config file.');
}

const forecast = (lat, lon, callback) => {
    if(!lat instanceof Number || !lon instanceof Number){
        callback('Invalid arguments. Latitude and Longitude must be numbers.');
    }

    const url = base_url + '?access_key=' + key + `&query=${lat},${lon}`;

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Error connecting with forecast service.');
        } else if(response.body.success === false){
            callback(response.body.error.info);
        } else if(response.body.current.observation_time === null){
            callback('Unknown location.');
        } else{
            callback(null, response.body);
        }
    });

};

module.exports = forecast;