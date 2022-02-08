

function createUrl(event) {
  event.preventDefault();
  event.stopPropagation();

  // TODO: Grab the City and Query
  var city = searchInputEl.val();
  var query;

  var APIkey = "82d5daf2ee6f522b1b5e4b3cf21b2f07";
  var limit = 1;
  var saveArray = [];

  var geocodingUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=" +
    limit +
    "&appid=" +
    APIkey;

  findLatLon(geocodingUrl);

  // Use url created to search for the cities Lat/Lon
  function findLatLon(url) {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var state = data[0].state;

        for (i = 0; i < saveArray.length; i++) {
          if (city.toLowerCase() !== saveArray[i].city.toLowerCase()) {
            i++;
          } else {
            searchFoursquare(query, city, state, lat, lon);
            return;
          }
        }

        var object = {
          lat: lat,
          lon: lon,
          state: state,
          city: city,
          query: query,
        };

        saveArray.push(object);
        localStorage.setItem("searches", JSON.stringify(saveArray));
        searchFoursquare(query, city, state, lat, lon);
      });
  }
}

function searchFoursquare(query, city, state, lat, lon) {
  requestUrl =
    "https://api.foursquare.com/v3/places/search?query=" +
    query +
    "&ll=" +
    lat +
    "%2C" +
    lon;

  var options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3a28437clLV4OGd1TqTQpoGeqZglCHRplaWmbBfL4UzY=",
    },
  };

  fetch(requestUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(city);
      console.log(state);
      console.log(data);
    });
}
