//http://api.weatherapi.com/v1/search.json?key=c13ed42657344d6780b214859231508&q=lond

const input = document.getElementById("country");

input.addEventListener("keyup", function (e) {
  let countryName = e.target.value;
  //   console.log(countryName);
  getData(countryName);
});

async function getData(countryId = "cairo") {
  let data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=c13ed42657344d6780b214859231508&q=${countryId}&days=2`
  );
  let res = await data.json();
  displayTodayWeather(res.location, res.current);
  displayOtherDay(res.forecast.forecastday);
  console.log("today", res.location.localtime, res.location, res.current);
}

getData();

function displayTodayWeather(WeatherResLocation, WeatherResCurrent) {
  var weather = "";
  let dateToday = new Date(`${WeatherResLocation.localtime}`);
  let dateNum = dateToday.getDate();
  let dateDay = dateToday.toLocaleDateString("en-US", { weekday: "long" });
  let dateMonth = dateToday.toLocaleDateString("en-US", { month: "long" });
  weather += `
  <div
  class="ps-0 pe-0 rounded-start-2 bg-blueWhite min-vh-50 mb-3 mb-md-0"
>
  <div class="headerWeather d-flex justify-content-between">
    <div>${dateDay}</div>
    <div>${dateNum} ${dateMonth}</div>
  </div>
  <h6 class="p-3">${WeatherResLocation?.name}</h6>
  <div class="pt-3 ps-3 pe-3 d-flex justify-content-between">
    <div class="font80">${WeatherResCurrent?.temp_c}<sup>o</sup> c</div>
    <div> <img class="logoImg" src="${WeatherResCurrent?.condition?.icon}" /></div>
    </div>
    <h6 class="blueText px-3">${WeatherResCurrent?.condition?.text}</h6>
    <div class="d-flex mt-4 justify-content-around">
      <span><img src="./images/icon-umberella.png" alt=""> ${WeatherResCurrent?.wind_mph} %</span>
      <span><img src="./images/icon-wind.png" alt=""> ${WeatherResCurrent?.wind_kph} km/h</span>
      <span><img src="./images/icon-compass.png" alt="">  ${WeatherResCurrent?.wind_dir}</span>
    </div>
</div>
    `;
  document.getElementById("todayWeather").innerHTML = weather;
}

function displayOtherDay(otherDay) {
  let otherDayContainer = "";
  for (let i = 0; i < otherDay.length; i++) {
    let date1 = new Date(`${otherDay[i].date}`);
    let dateDay = date1.toLocaleDateString("en-US", { weekday: "long" });
    otherDayContainer += `
    <div class="col-md-6 ps-0 pe-0 bg-blueDark min-vh-50 mb-3 mb-md-0 ${
      otherDay[i] == 1 ? "item" : "lastItem"
    }">
    <div class="headerWeather">${dateDay}</div>
    <div class="p-3 text-center">
      <img src="${otherDay[i]?.day?.condition.icon}" alt="" srcset="" />
      <div class="mt-4">
        <h4>${otherDay[i]?.day?.maxtemp_c} <sup>o</sup>C</h4>
        <h6>${otherDay[i]?.day?.mintemp_c} <sup>o</sup>C</h6>
      </div>
      <h6 class="blueText">${otherDay[i]?.day?.condition.text}</h6>
    </div>
  </div>`;
  }
  document.getElementById("otherWeather").innerHTML = otherDayContainer;
}

// navigator.geolocation.getCurrentPosition(success, Error);

// function success(event) {
//   console.log(event);
// }
// function Error(event) {
//   console.log(event);
// }
