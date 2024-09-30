const apiKey = 'apiKey=9te2009b94ad39f916306f09bc5do169'; // Replace with your OpenWeather API key
const apiUrl = 'apiUrl=https://api.shecodes.io/ai/v1/generate?prompt={prompt}&context={context}&key={key}';

document.getElementById('searchButton').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    
    if (response.ok) {
        const data = await response.json();
        displayWeather(data);
    } else {
        document.getElementById('warning').innerText = 'City not found!';
        clearWeatherInfo();
    }
}

function displayWeather(data) {
    document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').innerText = `Condition: ${data.weather[0].description}`;
    
    // Weather warning logic
    if (data.weather[0].main.toLowerCase() === 'storm') {
        document.getElementById('warning').innerText = 'Warning: Severe storm conditions!';
    } else {
        document.getElementById('warning').innerText = '';
    }
}

function clearWeatherInfo() {
    document.getElementById('location').innerText = '';
    document.getElementById('temperature').innerText = '';
    document.getElementById('description').innerText = '';
}