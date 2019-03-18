const request = require('request');

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibXRhbndlZXIiLCJhIjoiY2pzemNpbm1iMHlzYTQ5cXh4NzNicHkycyJ9.DxrL8nqfl1vuUrlH2YIbSA&limit=1`;

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to conncect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;