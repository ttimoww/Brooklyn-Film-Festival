import { get } from './xhr.js';

const brooklynId = '5110302';
const apiKey = '4e262f77fbfc100ee6fca720cc13e5e5'

/**
* Get the current weather in the provided city
* @param {string} cId ID of the city you want the weather of
* @param {string} aKey Api key of openweatherApi
* @param {function} _callback Callback function to call when this function is finished (get fore cast)
*/
const getCurrentWeather = function(cId, aKey, _callback){
  const req = `https://api.openweathermap.org/data/2.5/weather?id=${cId}&units=metric&cnt=2&APPID=${aKey}`;
  get(req).then(function(response){
    response = JSON.parse(response);
    let desc;
    let ico;
    const temp = Math.round(response.main.temp);
    for (let item of response.weather){
      desc = item.description;
      ico = item.icon;
    }
    writeToPage('now', temp, desc, ico);
    _callback(brooklynId, apiKey);
  }, function(error){
    console.log(error);
    _callback(brooklynId, apiKey);
  })

}

/**
* Get the weather forecast of the provided city
* @param {string} cId ID of the city you want the forecast of
* @param {string} aKey Api key of openweatherApi
*/
const getForeCast = function(cId, aKey){
  const req = `https://api.openweathermap.org/data/2.5/forecast?id=${cId}&units=metric&cnt=2&APPID=${aKey}&cnt=2`;
  get(req).then(function(response){
    response = JSON.parse(response);

    for(let item of response.list){
      var dateTime = item.dt_txt; // Date + Time
      var time = dateTime.split(' ')[1].slice(0, 5); // Cut out time of string
      var avgTemp = Math.round(item.main.temp);
      for (let desc of item.weather){
        var weatherDesc = desc.description;
        var weatherIcon = desc.icon;
        writeToPage(time, avgTemp, weatherDesc, weatherIcon);
      }
    }

    //writeToPage('now', temp, desc, ico);
  }, function(error){
    console.log(error);
  })
}

/**
* Writes weather data to the page
* @param {string} time The date of the weather data
* @param {string} temp The average temperature for that day
* @param {string} desc Weather description
* @param {string} ico Icon code for weather image
*/
const writeToPage = function(time, temp, desc, ico){
  var mainContainer = document.querySelector('.weatherDay-container');

  var weatherContainer = document.createElement('div');
  weatherContainer.classList.add('weatherDay');
  weatherContainer.classList.add('col-xs-4');
  mainContainer.appendChild(weatherContainer);

  var dateHeader = document.createElement('h4');
  dateHeader.innerHTML = time;
  weatherContainer.appendChild(dateHeader);

  var weatherIcon = document.createElement('img');
  weatherIcon.src = 'img/openweather/' + ico + '.png';
  weatherContainer.appendChild(weatherIcon);

  var weatherDesc = document.createElement('p');
  weatherDesc.innerHTML = temp + '&#x2103';
  weatherContainer.appendChild(weatherDesc);
};

getCurrentWeather(brooklynId, apiKey, getForeCast);
