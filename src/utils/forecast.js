const request = require('request')
require('dotenv').config()
const forecast = (latitude, longitude, callback) => {
    const query = latitude.toString() +","+ longitude.toString();
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_ACCESS_KEY + '&query=' + query;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
             // console.log("Not able to connect to weather stack api");
            callback('Not able to connect to weather stack forecast api', undefined);
        } else if (body.error) {
          // console.log("Not able to fetch data !!");
            callback('Not able to fetch data !! try another search', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' right now , It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast