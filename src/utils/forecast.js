const request = require('postman-request')
const weather = (latitude,logitude,units,callback) => {
	const url='http://api.weatherstack.com/current?access_key=70d11eca8756d54db1e078808df32f65&query='+latitude+','+logitude+'&units='+units
	request({url:url,json:true},(error,response) => {
		if(error)
		{
			callback('Unable to connect weather api',undefined)	
		}
		else if(response.body.error)
		{
			callback('Unable to find location',undefined)
			console.log('url',url)
		}
		else
		{
			callback(undefined,{
				description:response.body.current.weather_descriptions[0]
			})
		}
	})
}
module.exports = weather