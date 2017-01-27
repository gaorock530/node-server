const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address); //decodeURIComponent('string');

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the Google servers.');
        }else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        }else if (body.status === 'OK') {
            var result = body.results[0];

            callback(undefined, {
                address: result.formatted_address,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng
            });
        }
        
    });
};

var geocodeTemp = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/2e6c0786a58e8db1e02340fddc2ecebd/${lat},${lng}`,
        json: true
    },(error, response, body) => {
        if (error){
            callback('Unable to connect to Weather API.');
        }else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: (body.currently.temperature/17.222).toFixed(2),
                apparentTemperature: (body.currently.apparentTemperature/17.222).toFixed(2)
            });
        }else{
            callback('Unable fatch the weather!');
        }
    });

};

module.exports = {
    geocodeAddress,
    geocodeTemp
};