(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Handlers = require("./handlers.js");

function app() {
  Handlers.setupEvents();
}

// window.app = app;
window.onload = function () {
  app();
};

},{"./handlers.js":3}],2:[function(require,module,exports){
"use strict";

module.exports = {
  api_key: "728a1c08a0d3090a7972be3ae9ab11bd"
};

},{}],3:[function(require,module,exports){
"use strict";

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
  var uri = options.base_url + "search/movie?api_key=" + options.API_KEY + "&language=" + options.language + "&query=" + searchTerm;
  console.log(uri);
  console.log(options.API_KEY);
  fetch(uri).then(function (response) {
    return response.json();
  }).then(function (data) {
    data.results.forEach(function (element) {
      // for every id => get path to movie poster + movie details
      var movie = element;
      var movieId = element.id;
      getImagePath(movieId).then(function (imageUrl) {
        view.displayMovies(movie, imageUrl);
      });
    });
  });
}

function getImagePath(movieId, movie) {
  var imagePathUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/images?api_key=728a1c08a0d3090a7972be3ae9ab11bd&language=en-US&include_image_language=en%2Cnull";
  fetch(imagePathUrl).then(function (response) {
    return response.json();
  }).then(function (images) {
    return new Promise(function (resolve) {
      resolve(images.posters[0].file_path);
    });
  });
}

module.exports = {
  setupEvents: function setupEvents() {
    document.getElementById("searchButton").addEventListener("click", function () {
      var query = document.getElementById("queryInput").value;
      getMovie(query);
      document.getElementById("myForm").reset();
    });
  }
};

},{"./config.js":2,"./view.js":4}],4:[function(require,module,exports){
"use strict";

var movieViewer = {
  displayMovies: function displayMovies(movie, imagePath) {
    var container = document.createElement("div");
    var img = document.createElement("img");
    var details = document.createElement("div");

    container.setAttribute("class", "container");
    img.setAttribute("class", "posters");

    img.setAttribute("src", imagePath);
    details.setAttribute("class", "details");
    for (var key in element) {
      if (key == "title") {
        var header = document.createElement("h4");
        header.innerHTML = element[key];
        details.appendChild(header);
      } else if (key == "overview") {
        var p = document.createElement("p");
        p.innerHTML = element[key];
        details.appendChild(p);
      }
    }
    container.appendChild(img);
    container.appendChild(details);
    document.getElementById("main").appendChild(container);
  }
};

module.exports = movieViewer;

},{}]},{},[1]);
