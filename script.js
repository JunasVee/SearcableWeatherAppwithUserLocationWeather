const country = document.getElementById('countryName');
const degree = document.getElementById('degreeValue');
const desc = document.getElementById('desc');
const searchBar = document.getElementById('srcbar');
const btn = document.getElementById('button');

const apiKey = "0c73f54629b6492680c293081047c8a8";
const apiUrl = "https://api.openweatherapp.org/data/2.5/weather?units=metric&q=jakarta";

const api = {
    key: apiKey,
    base: "https://api.openweathermap.org/data/2.5/"
}

const showWeather = (weather) => {
    country.innerText = `${weather.name}, ${weather.sys.country}`;
    degree.innerText = `${Math.round(weather.main.temp)}`;
    description.innerText = `${weather.weather[0].description}`;
  }
  
  const getWeather = async (lat, lon) => {
    const response = await fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`);
    const data = await response.json();
    showWeather(data);
  }

  navigator.geolocation.getCurrentPosition((position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  });

  async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
  }
  
  // Function to update the UI with the weather data
  function updateWeatherUI(data) {
    const city = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    
    country.textContent = city;
    degree.textContent = temperature;
    desc.textContent = description;
  }

  btn.addEventListener('click', async function() {
    const city = searchBar.value;
    const data = await getWeatherData(city);
    updateWeatherUI(data);
  });