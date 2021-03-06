console.log('Client side JS file')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message_one')
const messageTwo = document.querySelector('#message_two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = "Forecast: " + data.forecast
            }
        })
    })
})