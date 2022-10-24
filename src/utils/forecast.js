const request = require('request')

const forecast = (X,Y,callback) => {
    const url='http://api.weatherstack.com/current?access_key=8e0c04d566184dae5daea2ab67e0edee&query='+X+','+Y+''

    request({ url: url, json: true }, (error, response) => {
        callback('Time is:'+response.body.location.localtime+'->'+response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. It feels like ' + response.body.current.feelslike + ' degress.')
    })
}

module.exports = forecast