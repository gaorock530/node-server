const yargs = require('yargs');
const axios = require('axios');

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


var encodedAddress = encodeURIComponent(argv.address); //decodeURIComponent('string');
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((res) => {
    if (res.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }

    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/2e6c0786a58e8db1e02340fddc2ecebd/${lat},${lng}`;
    console.log(res.data.results[0].formatted_address);

    return axios.get(weatherUrl);
}).then((res) => {
    var temperature = (res.data.currently.temperature/17.222).toFixed(2);
    var apparentTemperature = (res.data.currently.apparentTemperature/17.222).toFixed(2);
    console.log(`The current temperature is ${temperature} ℃, and It feels like ${apparentTemperature} ℃`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND')
        console.log('Unable to connect API servers.');
    else 
        console.log(e.message);
});