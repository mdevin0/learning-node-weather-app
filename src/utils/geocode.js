const request = require('postman-request');

const loadConfig = require('./load-config.js')

let base_url;
let key;

if(process.env.MAPBOX_GEOCODE_BASE_URL && process.env.MAPBOX_KEY){
    base_url = process.env.MAPBOX_GEOCODE_BASE_URL;
    key = process.env.MAPBOX_KEY;
    console.log('Loading mapbox variables from environment.');
} else {
    let config = loadConfig();
    base_url = config.mapbox_geocode_base_url;
    key = config.mapbox_key;
    console.log('Loading mapbox variables from config file.');
}

const geocode = (address, callback) => {
    const url = base_url + encodeURIComponent(address) 
        + '.json?access_token=' + key + '&limit=1';

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Failed to connect with location services.');
        } else if(response.body.features.length === 0){
            callback(`Location '${address}' not found.`);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });

}

module.exports = geocode;