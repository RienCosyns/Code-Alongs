let movieViewer = {
  displayMovies(movie, imagePath) {
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
