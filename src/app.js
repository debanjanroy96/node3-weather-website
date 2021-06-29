const path = require('path')
const express = require('express')
const hbs =require('hbs')
const functions = require('./utils/apifunction')
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../'))
const publicDirectory=path.join(__dirname,'../public')
//console.log(publicDirectory)
const viewsPath=path.join(__dirname,'./templates/views')
const partialsPath=path.join(__dirname,'./templates/partials')

const port = process.env.PORT || 3000

const app=express()

//set up static directory to server
app.use(express.static(publicDirectory))
//set up handlebar engins and locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
	res.render('index',{
		title:'Weather App title',
		name:'Debanjan Roy'
	})
})
app.get('/about',(req,res) => {
	res.render('about',{title:'About title',name:'Debanjan Roy'})
})
app.get('/help',(req,res) => {
	res.render('help',{
		title:'help title',
		name:'Debanjan Roy',
		description:'comming soon..'
	})
})
app.get('/help/*',(req,res)=> {
res.send('Help article not found')	
})
app.get('/weather',(req,res)=> {
	if(!req.query.address)
	{
		return res.send({
			error:'you must provide an addresss'
		})
	}
	functions.geocode(req.query.address,(error,{longitude,latitude,url}={}) => {
		if(error)
		{
			return res.send({error})
		}
		functions.weather(latitude,longitude,'f',(error,forecastData) => {
			if(error)
			{
				return res.send({error})
			}
			return res.send({
				data:forecastData,
				address:req.query.address,
				url,
			})
		})
	})
	
		/*res.render('weather',{
			title:'weather',
			name:'Debanjan Roy',
			description:'use this site to get your weather',
			address:req.query.address,
		})*/
})

app.get("/products",(req,res) => {
	if(!req.query.search)
	{
		return res.send({error:'you must provide search term'})
	}
	res.send({
		products:[]
	})
	
})

app.get('*',(req,res)=> {
res.render('404',{
					title:'404',
					error_message:'page not found'
				})	
})
app.listen(port,() => {
	console.log('server is up on port '+port)
})