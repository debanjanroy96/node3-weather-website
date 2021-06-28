const request = require('postman-request')
const geocode = (address,callack) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGViYW5qYW5yb3kiLCJhIjoiY2tqczB5ank1MXhyNzMwbHk2OHg2M3N6MyJ9.Pzpv0KMoRr3J7JDmFb-qUA&limit=1'
	request({url:url,json:true},(error,response) =>{
		if(error)
		{
			callack('Unable to connect location service',undefined)
		}
		else if(response.body.error)
		{
			callack('Unable to find location',undefined)
		}
		else
		{
			callack(undefined,{
				latitude:response.body.features[0].center[0],
				lngitude:response.body.features[0].center[1],
				location:response.body.features[0].place_name
			})		
		}
	})
}
const weather = (latitude,logitude,units,callback) => {
	/*const url = 'http://api.weatherstack.com/current?access_key=70d11eca8756d54db1e078808df32f65&query='+encodeURIComponent(address)+'&units='+units*/
	const url = 'http://api.weatherstack.com/current?access_key=70d11eca8756d54db1e078808df32f65&query='+latitude+','+logitude+'&units='+units
	request({url:url,json:true},(error,response) => {
		if(error)
		{
			callback('Unable to connect weather api',undefined)	
		}
		else if(response.body.error)
		{
			callback('Unable to find location',undefined)
		}
		else
		{
			callback(undefined,{
				description:response.body.current.weather_descriptions[0]
			})
		}
	})
}
module.exports = {
	geocode:geocode,
	weather:weather
}
