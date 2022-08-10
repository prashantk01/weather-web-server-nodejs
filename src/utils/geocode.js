const request = require('request')
require('dotenv').config()

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{'+address+'}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=' + process.env.YOUR_MAPBOX_ACCESS_TOKEN;
    request({ url, json: true }, (error, { body }) => {
       if (error) {
            // console.log("Not able to connect to mapbox geocoding api")
            callback('Not able to connect to mapbox geocoding api', undefined);
        } else if (body.error) {
            // console.log("Not able to fetch data !!")
            callback('Not able to fetch data !! try another search', undefined);
       } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                placeName: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode