const request = require('request')

const forecast = (latitude, longitude, callback) => {
    if(isNaN(longitude) || isNaN(latitude)) {
        console.log('longitude/latitude values must be numbers')
        callback()
        return
    }
    else {
        const url = 'https://api.darksky.net/forecast/a41dfa0673b8849f000a15c592045c73/' + latitude + ',' + longitude
        //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1IjoibGlzemV3c2tpIiwiYSI6ImNrNTJzMjZpeDAxMnMzbWxxNmp4ZmJiaXUifQ.bk5dtsByP7QIkkXTh6aUUw'
        request({url, json: true}, (error, {body}) => {
            if(error){
                callback('No internet', undefined)
            } else if(body.error){
                callback('No places match lat/lon input', undefined)
            } else{
                callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain")
            }
        })
    }
}
//https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoibGlzemV3c2tpIiwiYSI6ImNrNTJzMjZpeDAxMnMzbWxxNmp4ZmJiaXUifQ.bk5dtsByP7QIkkXTh6aUUw
module.exports  = forecast