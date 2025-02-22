const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cc006c12dd1c8e719fff5fcb42e65a43/' + latitude + ',' + longitude+'?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The highest temperature is '+body.daily.data[0].temperatureHigh+' and lowest is '+body.daily.data[0].temperatureLow+' There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast