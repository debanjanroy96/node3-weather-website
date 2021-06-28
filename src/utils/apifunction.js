const request = require('postman-request')
const geocode = (address,callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGViYW5qYW5yb3kiLCJhIjoiY2tqczB5ank1MXhyNzMwbHk2OHg2M3N6MyJ9.Pzpv0KMoRr3J7JDmFb-qUA&limit=1'
	request({url:url,json:true},(error,{body}) => {
		if(error)
		{
			callback('Unable to connect location services',undefined)
		} 
		else if(body.features.length === 0 || body.message)
		{
			callback('Unable to find location',undefined)
		}
		else
		{
			const latitude = body.features[0].center[0]
			const longitude = body.features[0].center[1]
			/*console.log("latitude: "+latitude)
			console.log("longitude: "+longitude)*/
			const data = {
				latitude:latitude,
				longitude:longitude,
				url
			}
			callback(error,data)
		}
	})
}
const weather = (latitude,logitude,units,callback) => {
	const url='http://api.weatherstack.com/current?access_key=70d11eca8756d54db1e078808df32f65&query='+logitude+','+latitude+'&units='+units
	request({url:url,json:true},(error,{body}) => {
		if(error)
		{
			callback('Unable to connect weather api',undefined)	
		}
		else if(body.error)
		{
			callback({error:'Unable to find location'},undefined)
		}
		else
		{
			callback(undefined,{
				name:body.location.name,
				country:body.location.country,
				description:body.current.weather_descriptions[0]
			})
		}
	})
}
module.exports = {
	geocode:geocode,
	weather:weather
}