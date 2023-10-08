const search = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const findWeather = () => {
  const APIKey = "";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    alert("Enter a valid City");
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric
    `)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // console.log(data.weather[0].main);
      switch (data.weather[0].main) {
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "";
          break;
      }

      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}K/hr`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      container.style.height = "590px";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
    });
};

search.addEventListener("click", findWeather);

searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    findWeather();
  }
});
