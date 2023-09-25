// Define OpenWeatherMap API key
const apiKey = 'a69ec7182d246fe321a0976c4cabdf1a';

// Get references to HTML elements
const locationInput = document.getElementById('location-input');
const getForecastButton = document.getElementById('get-forecast-button');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const weatherImage = document.getElementById('weather-image');
const weatherInfo = document.getElementById('weather-info');

// Add an event listener to the "Get Forecast" button
getForecastButton.addEventListener('click', () => {
    const location = locationInput.value.trim();

    if (location === '') {
        alert('Please enter a location name.');
        return;
    }

    // Make an API request to OpenWeatherMap using HTTPS
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                // Display an error message if location not found
                locationName.textContent = 'Weather Information not available';
                temperature.textContent = '';
                weatherImage.style.display = 'none';
                return;

            }

            // Update the widget with weather information
            locationName.textContent = `Location: ${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            weatherImage.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            weatherInfo.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Display an error message if there's an issue with the API request
            locationName.textContent = 'Weather Information not available';
            temperature.textContent = 'none';
            
        });
});

