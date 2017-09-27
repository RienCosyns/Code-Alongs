var view = require("./view.js");

var options = {
  base_url: "https://api.themoviedb.org/3/",
  API_KEY: require("./config.js").api_key,
  language: "en-US"
};
var poster = {
  base_url: "https://image.tmdb.org/t/p",
  size: "/w185"
};

function getMovie(searchTerm) {
  let uri = `${options.base_url}search/movie?api_key=${options.API_KEY}&language=${options.language}&query=${searchTerm}`;
  console.log(uri);
  console.log(options.API_KEY);
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(function(element) {
        // for every id => get path to movie poster + movie details
        var movie = element;
        var movieId = element.id;
        getImagePath(movieId).then(imageUrl => {
          view.displayMovies(movie, imageUrl);
        });
      });
    });
}

function getImagePath(movieId, movie) {
  var imagePathUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=728a1c08a0d3090a7972be3ae9ab11bd&language=en-US&include_image_language=en%2Cnull`;
  fetch(imagePathUrl)
    .then(response => response.json())
    .then(images => {
      return new Promise(resolve => {
        resolve(images.posters[0].file_path);
      });
    });
}

module.exports = {
  setupEvents: function() {
    document.getElementById("searchButton").addEventListener("click", () => {
      var query = document.getElementById("queryInput").value;
      getMovie(query);
      document.getElementById("myForm").reset();
    });
  }
};
