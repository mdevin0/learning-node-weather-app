const weatherForm = document.querySelector('#weatherForm');
const search = document.querySelector('#location');
const successMessage = document.querySelector('#successMessage');
const errorMessage = document.querySelector('#errorMessage');


weatherForm.addEventListener('submit', (event) => {
    // prevents page from reloading on submit.
    event.preventDefault();

    const location = search.value;

    if(!location){
        errorMessage.textContent = 'Please enter a location';
        successMessage.textContent = '';
    } else {
        errorMessage.textContent = '';
        successMessage.textContent = 'Loading...';

        fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    errorMessage.textContent = data.error;
                    successMessage.textContent = '';
                } else {
                    const {current: forecast, location} = data.forecast;
                    const locationText = `${location.name}, ${location.region}, ${location.country}`;
                    const weatherText = `It's ${forecast.temperature}°C degrees, it feels like ${forecast.feelslike}°C`;
                    errorMessage.textContent = '';
                    successMessage.textContent = `${locationText}. ${weatherText}`;
                }
            })
        });
    }
});