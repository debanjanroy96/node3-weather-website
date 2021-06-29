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
				messageOne.textContent = apidata.error
			}
			else
			{
				messageOne.textContent = apidata.data.place;
				messageTwo.textContent = 'Teparature is '+apidata.data.currentTemparature+' ^0f outside and weather type is '+apidata.data.countryDescription;
				console.log(apidata)
			}
		})
	})
})