const request = require('request')



const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidWd1cm9iYW4iLCJhIjoiY2w5a2QwZGplMGF0NDN3cWRkZGU1a29kMiJ9.93iltKVwOjacZTEX8_I5hQ&limit=1'

    request({url, json:true}, (error,{body}={}) => {
     try {
      
      callback(undefined,{
        latitude: body.features[0].center[1],
        longitude:body.features[0].center[0],
        location: body.features[0].context[0].text
        

   })
   
     } catch (error) {
     if(error){
        callback('Unable to connect to location services',undefined)
     }
     else if(body.features.length === 0){
        callback('Unable to find location.Try another search!',undefined)
     }
     else{
      callback('Error: '+error,undefined)
     }
     
     }
        
        
    })
}

module.exports = geocode