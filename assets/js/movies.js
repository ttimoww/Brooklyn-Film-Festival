var trailerContainer = document.querySelector(".trailer-container");
var trailerIframe = document.querySelector("#trailer-iframe")

/**
* Render table with movies to page
* @param {string} stage Name of the stage you want to render to the page
*/
const fillTable = function(stage){
  fetch("assets/json/" + stage + ".json")
  .then(res => res.json())
  .then(function(data){
    let tableBody = document.querySelector("#tbody-" + stage);
    for(let day of data.list){
      // Create tr with day and date
      var tr = document.createElement('tr');
      tableBody.appendChild(tr);
        var th = document.createElement('th');
        th.colSpan = "5";
        th.classList.add("table-day");
        tr.appendChild(th);
          var p = document.createElement('p');
          p.innerHTML = day.day + ' ' + day.date;
          th.appendChild(p);

      // Fill the table with movie info
      for(let movie of day.movies){
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);

          // Movie Title
          var title = document.createElement('th');
          title.scope = "row";
          title.classList.add("movie-title");
          title.innerHTML = movie.title;
          tr.appendChild(title);

          // Movie Genre
          var genre = document.createElement('td');
          genre.innerHTML = movie.genre;
          tr.appendChild(genre);

          // Movie time
          var time = document.createElement('td');
          time.innerHTML = movie.time;
          tr.appendChild(time);

          // Movie age
          var age = document.createElement('td');
          age.innerHTML = movie.age;
          tr.appendChild(age);

          // Movie trailer
          var trailer = document.createElement('td');
          tr.appendChild(trailer);
          var trailerimg = document.createElement('img');
          trailerimg.src = "img/socials/youtube.png";
          trailerimg.addEventListener("click", function(){initTrailer(movie.trailer)});
          trailer.appendChild(trailerimg);

      }
    }
  });
}

/**
* Set video of the trailer popup window
* @param {string} url Url of the trailer
*/
const initTrailer = function(url){
  trailerContainer.style.display = "block";
  trailerIframe.src = url;
}

// Listeners
trailerContainer.addEventListener("click", function(){
  trailerContainer.style.display = 'none';
  trailerIframe.src = "";
});


function initPage(){
  fillTable("waterfront");
  fillTable("forest");
  fillTable("bridge");
};

initPage();
