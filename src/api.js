const functions = require('./utils/geocode')
//const forecast = require('./utils/forecast')

const address = process.argv[2]

if(!address)
{
	console.log('Please give address')
}
else
{
	functions.geocode(address,(error,{longitude,latitude}) =>{
		console.log('error',error)
		console.log('longitude',longitude)
		console.log('latitude',latitude)
		functions.weather(longitude,latitude,'f',(error,response) => {
			console.log('error',error)
			console.log('data',response)
		})
	})
}