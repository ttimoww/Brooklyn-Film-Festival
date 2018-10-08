function initWeather(){
    getTodaysDate();
    getCurrentWeather();
    getForecast();
}
function getTodaysDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}
function getCurrentWeather(){
  fetch("https://api.openweathermap.org/data/2.5/weather?id=5110302&units=metric&APPID=4e262f77fbfc100ee6fca720cc13e5e5")
  .then(response => response.json())
				.then(function(openWeather){
          var temp = Math.round(openWeather.main.temp);
          for (let item of openWeather.weather){
            var desc = item.description;
            var ico = item.icon;
          }
          generateHTML('now', temp, desc, ico);
				});
}
function getForecast(){
  fetch("https://api.openweathermap.org/data/2.5/forecast?id=5110302&units=metric&APPID=4e262f77fbfc100ee6fca720cc13e5e5")
  .then(response => response.json())
				.then(function(openWeather){
          var count = 0;
          console.log(getTodaysDate());
          for (let item of openWeather.list){
            if(item.dt_txt.includes('12:00') === true && item.dt_txt.includes(getTodaysDate()) === false){
              var dateTime = item.dt_txt; // DATE + TIME
              date = dateTime.substring(0, dateTime.indexOf(' ')); // DATE ONLY
              var avgTemp = Math.round(item.main.temp); // AVG TEMPR
              for (let desc of item.weather){
                var weatherDesc = desc.description;// DESC
                var weatherIcon = desc.icon;
                generateHTML(date.slice(5), avgTemp, weatherDesc, weatherIcon);
              }
              count++;
            }
            if(count == 2){break;}
          }
				});
}
function generateHTML(date, temp, desc, ico){
  var mainContainer = document.querySelector('.weatherDay-container');

  var weatherContainer = document.createElement('div');
  weatherContainer.classList.add('weatherDay');
  weatherContainer.classList.add('col-xs-4');
  mainContainer.appendChild(weatherContainer);

  var dateHeader = document.createElement('h4');
  dateHeader.innerHTML = date;
  weatherContainer.appendChild(dateHeader);

  var weatherIcon = document.createElement('img');
  weatherIcon.src = '../img/openweather/' + ico + '.png';
  weatherContainer.appendChild(weatherIcon);

  var weatherDesc = document.createElement('p');
  weatherDesc.innerHTML = temp + '&#x2103';
  weatherContainer.appendChild(weatherDesc);
};

initWeather();
