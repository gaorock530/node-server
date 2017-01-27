const yargs = require('yargs');
const request = require('request');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to fatch weather for.',
            string: true
        }
    })
    .help()
    .alias('help', '?')
    .argv;

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address); //decodeURIComponent('string');

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to the Google servers.');
            }else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            }else if (body.status === 'OK') {
                var result = body.results[0];

                resolve({
                    address: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                });
            }
            
        });
    });
};

var geocodeWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
        url: `https://api.dar1ksky.net/forecast/2e6c0786a58e8db1e02340fddc2ecebd/${lat},${lng}`,
        json: true
        },(error, response, body) => {
            if (error){
                reject('Unable to connect to Weather API.');
            }else if (response.statusCode === 200) {
                resolve({
                    temperature: (body.currently.temperature/17.222).toFixed(2),
                    apparentTemperature: (body.currently.apparentTemperature/17.222).toFixed(2)
                });
            }else{
                reject('Unable to fatch the weather!');
            }
        });
    });
};

geocodeAddress(argv.address).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
    geocodeWeather(res.latitude, res.longitude).then((weather) => {
        console.log(JSON.stringify(weather, undefined, 2))
    }).catch((error) => {
        concole.log(error);
    });
}).catch((error) => {
    console.log(error);
});