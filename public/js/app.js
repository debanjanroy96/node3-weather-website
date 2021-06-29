const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
 

weatherForm.addEventListener('submit',(e) => {
	e.preventDefault()
	const location = search.value;
	
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	fetch('/weather?address='+location).then((response) => {
		response.json().then((apidata) => {
			if(apidata.error)
			{
				messageOne.textContent = apidata.error;
			}
			else if(apidata.data=="<html>\r\n<head><title>520 Origin Error</title></head>\r\n<body bgcolor=\"white\">\r\n<center><h1>520 Origin Error</h1></center>\r\n<hr><center>cloudflare-nginx</center>\r\n</body>\r\n</html>\r\n")
			{
				messageOne.textContent = "Something went wrong";
			}
			else
			{
				messageOne.textContent = apidata.data.place+","+apidata.data.countryName;
				messageTwo.textContent = apidata.data.countryDescription+' through out the day.It is currently  '+apidata.data.currentTemparature+' degree out.wind is blowing at a speed of '+apidata.data.windSpeed+' towards '+apidata.data.windDirection+'.Current humidity is '+apidata.data.currentHumidity+' degree';
			}
		})
	})
})