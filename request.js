/*
*   Weather fatching App
*/

//const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (error, results) => {
    if (error){
        console.log(error);
    } else{
        console.log(JSON.stringify(results, undefined, 2));
        console.log('Fatching weather...');
        geocode.geocodeTemp(results.latitude, results.longitude, (error, weather) => {
            if (error){
                console.log(error);
            }else{
                console.log(`The current temperature is ${weather.temperature} ℃, and It feels like ${weather.apparentTemperature} ℃`);
            }
        });
    }
});

//2e6c0786a58e8db1e02340fddc2ecebd