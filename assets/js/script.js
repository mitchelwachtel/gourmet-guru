function processInputs(event) {
  event.preventDefault();
  event.stopPropagation();

  // Grab the City and Query
  var city = inputCity.value;
  var query = inputRestaurant.value;
  var food = inputFood.value;
  var saveArray = [];

  findLatLon(city, food);
  searchNutrition(food);

  // Use url created to search for the cities Lat/Lon
  function findLatLon(city, food) {
    var APIkey = "82d5daf2ee6f522b1b5e4b3cf21b2f07";
    var limit = 1;

    var geocodingUrl =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=" +
      limit +
      "&appid=" +
      APIkey;

    fetch(geocodingUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var state = data[0].state;

        var object = {
          lat: lat,
          lon: lon,
          state: state,
          city: city,
          query: query,
          food: food,
        };

        saveArray.push(object);
        localStorage.setItem("searches", JSON.stringify(saveArray));
        searchFoursquare(query, city, state, lat, lon);
      });
  }

  function searchFoursquare(query, city, state, lat, lon) {
    var requestUrl =
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
        Authorization: "fsq3PGxnpcWfbFGOcnbrVvHHpMXUzoL1BBYdikdFgCyCzT0=",
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

  // Search the Nutrition for the food item on Spoonacular
  function searchNutrition(food) {
    var options = {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "12387f33b5mshfdb8fc19ce32286p1e7d1djsn78329e4b2167",
      },
    };

    fetch(
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/guessNutrition?title=" +
        food,
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
}

$(document).ready(function () {
  $(".header").height($(window).height());
});

var inputRestaurant = document.getElementById("inputRestaurant");
var inputCity = document.getElementById("inputCity");
var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", processInputs);
