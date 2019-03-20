const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/910c7ac3aaf418f1bd926782d33f0af2/${lat},${lng}`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to conncect to location services', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, `It is currently ${body.currently.apparentTemperature} degrees.There is ${body.currently.precipProbability}% chance of rain. Wind speed is ${body.currently.windSpeed}`);
        }
    });

}

module.exports = forecast;