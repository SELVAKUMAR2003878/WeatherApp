
const weatherForm = document.querySelector(".weatherForm");
const cityName = document.querySelector(".cityName");
const card = document.querySelector(".card");
const apiKey = "b07a619b34baecfd15552e131079e6be";

weatherForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const city = cityName.value;

  //card.style.display = "block";
  //card.textContent = "Loding";

  if (city == null || city == "") {
    displayError("please enter a city Name");
  }
  else {
    try {
      const weatherData = await getWeather(city);

      displayWeather(weatherData);
    }
    catch (err) {
      console.error(err);
      displayError(err);
    }
  }
})

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  //console.log(response);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  else {
    return await response.json();
  }

}

function displayWeather(data) {

  const { name: city,
    main: { temp, humidity },
    weather: [{ description, id }] } = data;

  card.textContent = "";
  card.style.display = "block";

  const citydisplay = document.createElement("h1");
  citydisplay.textContent = city;
  citydisplay.classList.add("city");
  card.appendChild(citydisplay);

  const temperature = document.createElement("h1");
  temperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  temperature.classList.add("temp");
  card.appendChild(temperature);

  const humidityDisplay = document.createElement("p");
  humidityDisplay.textContent = `Humidity: ${humidity}`;
  humidityDisplay.classList.add("humidity");
  card.appendChild(humidityDisplay);

  const sky = document.createElement("p");
  sky.textContent = description;
  sky.classList.add("sky");
  card.appendChild(sky);

  const emoji = document.createElement("p");
  emoji.textContent = getWeatherEmoji(id);
  emoji.classList.add("emoji");
  card.appendChild(emoji);

}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case (weatherId >= 200 && weatherId < 300):
      return "🌦️";

    case (weatherId >= 300 && weatherId < 400):
      return "🌧️";

    case (weatherId >= 500 && weatherId < 600):
      return "🌧️";

    case (weatherId >= 600 && weatherId < 700):
      return "❄️";

    case (weatherId >= 700 && weatherId < 800):
      return "🍃";

      case (weatherId === 800):
        return "☀️";

    case (weatherId >= 801 && weatherId < 810):
      return "☁️";
    
    default:
        return "❓"
  }

}

function displayError(err) {

  const error = document.createElement("p");
  error.classList.add("errorDisplay");
  error.textContent = err;
  card.textContent = "";
  card.style.display = "block";
  card.appendChild(error);

}
