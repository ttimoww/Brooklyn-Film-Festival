function initPage(){
    todaysDate();
    getForecast();
}

function todaysDate(){
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

function getForecast(){
  fetch("https://api.openweathermap.org/data/2.5/forecast?id=5110302&units=metric&APPID=4e262f77fbfc100ee6fca720cc13e5e5")
  .then(response => response.json())
				.then(function(openWeather){
          var count = 0;
          console.log(todaysDate());
          for (let item of openWeather.list){
            if(item.dt_txt.includes('12:00') === true && item.dt_txt.includes(todaysDate()) === false){
              console.log(item.dt_txt); // DATE + TIME
              console.log(item.main.temp); // AVG TEMPR
              for (let desc of item.weather){
                console.log(desc.description); // DESC
              }
              count++;
            }
            if(count == 3){break;}
          }
				});
}

initPage();



//API KEY = 4e262f77fbfc100ee6fca720cc13e5e5

//  BROOKLYN{ "id": 5019335, "name": "Brooklyn Park", "country": "US","coord": {"lon": -93.356339, "lat": 45.094131 }}
