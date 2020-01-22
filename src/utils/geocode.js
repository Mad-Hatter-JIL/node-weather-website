const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGlzemV3c2tpIiwiYSI6ImNrNTJzMjZpeDAxMnMzbWxxNmp4ZmJiaXUifQ.bk5dtsByP7QIkkXTh6aUUw'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            console.log('first error')
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length < 1) {
            console.log('second error')
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log('made it')
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports  = geocode
