const loadConfig = require('./load-config.js')
const request = require('postman-request');


const config = loadConfig();
const base_url = config.weatherstack_base_url;
const key = config.weatherstack_key;

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