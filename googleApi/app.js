function myMap() {
  //   var map;
  // display location by reverse geocoding
  function geocodeLatLng(geocoder, latlng) {
    geocoder.geocode({ location: latlng }, function(results, status) {
      console.log(status);
      if (status === "OK") {
        //console.log(results);
        // display position in human readible form
        var h2 = document.createElement("h2");
        h2.innerHTML = results[0].formatted_address;
        document.getElementById("location").appendChild(h2);
        // display position on a map
        map = new google.maps.Map(document.getElementById("googleMap"), {
          center: latlng,
          zoom: 15
        });
        //create a marker
        var marker = new google.maps.Marker({
          position: latlng,
          title: "Elium Academy",
          animation: google.maps.Animation.DROP,
          draggable: true
          // map: map
        });
        marker.setMap(map);
        // add a marker on click
        initListeners(map);
      }
    });
  }

  // get geolocation
  function getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        var latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var geocoder = new google.maps.Geocoder();
        geocodeLatLng(geocoder, latlng);
      });
    }
  }

  // add a marker on click
  function addMarker(location, map) {
    var newMarker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP
    });
  }
  //pass in a location
  document
    .getElementById("locationButton")
    .addEventListener("click", function() {
      getGeoLocation();
    });

  function initListeners(map) {
    google.maps.event.addListener(map, "click", function(event) {
      console.log(event);
      addMarker(event.latLng, map);
    });
  }
}
