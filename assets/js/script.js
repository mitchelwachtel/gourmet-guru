$(document).ready(function () {
  $(".header").height($(window).height());
});
var form =document.querySelector('.needs-validation')
var inputRestaurant = document.getElementById("inputRestaurant");
var inputCity = document.getElementById("inputCity");
var inputFood = document.getElementById("inputFood");
var inputRating = document.getElementById("inputRating");
var inputComment = document.getElementById("inputComment");
var saveArray = [];

$("#searchBtn").on("click", processInputs);
$("#card-reviews").on("click", ".delete-button", deleteLog);

function processInputs(event) {
  if(!form.checkValidity ()){
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated');

  // Grab the City and Query
  var city = inputCity.value;
  var restaurantQuery = inputRestaurant.value;
  var food = inputFood.value;
//   var rating = inputRating.value;
//   var comment = inputRating.value;

  var queryObject = {
    city: city,
    restaurantQuery: restaurantQuery,
    food: food,
    date: moment().format("MMMM Do YYYY"),
    uniqueId:
      moment().format("MM") +
      moment().format("DD") +
      moment().format("Y") +
      moment().format("h") +
      moment().format("m") +
      moment().format("s") +
      moment().format("a"),
    // rating: rating,
    // comment: comment,
  };

  findLatLon();

  // Use url created to search for the cities Lat/Lon
  function findLatLon() {
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

        queryObject.lat = lat;
        queryObject.lon = lon;
        queryObject.state = state;

        searchFoursquare();
      });
  }

  function searchFoursquare() {
    var requestUrl =
      "https://api.foursquare.com/v3/places/search?query=" +
      queryObject.restaurantQuery +
      "&ll=" +
      queryObject.lat +
      "%2C" +
      queryObject.lon;

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
        console.log(data);
        queryObject.fsq_id = data.results[0].fsq_id;
        queryObject.restaurant = data.results[0].name;
        queryObject.address = data.results[0].location.address;
        searchNutrition();
      });
  }

  // Search the Nutrition for the food item on Spoonacular
  function searchNutrition() {
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
        queryObject.food,
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        queryObject.calories = data.calories.value;
        saveArray.push(queryObject);
        localStorage.setItem("userLogs", JSON.stringify(saveArray));
        displayLog(queryObject);
      });
  }
}

function displayLog(queryObject) {
  //   Create card and append it to div
  console.log(queryObject);

  var logDiv = $("<div></div>");
  logDiv.addClass("logDiv");
  logDiv.addClass("card");
  logDiv.attr("data-unique", queryObject.uniqueId);

  var a = $("<h3>" + queryObject.restaurant + "</h3>");
  a.addClass("restaurant");
  logDiv.append(a);

  var b = $("<p>" + queryObject.date + "</p>");
  b.addClass("date");
  logDiv.append(b);

  var c = $("<p>" + queryObject.city + ", " + queryObject.state + "</p>");
  c.addClass("city-state");
  logDiv.append(c);

  var d = $("<p>" + queryObject.address + "</p>");
  d.addClass("address");
  logDiv.append(d);

  var e = $(
    "<p>" + queryObject.food + " Calories: " + queryObject.calories + "</p>"
  );
  e.addClass("food");
  logDiv.append(e);

//   var f = $("<p>" + queryObject.rating + "</p>");
//   f.addClass("rating");
//   logDiv.append(f);

//   var g = $("<p>" + queryObject.comment + "</p>");
//   g.addClass("comment");
//   logDiv.append(g);

  var h = $("<button>Delete</button>");
  h.addClass("delete-button");
  logDiv.append(h);

  $("#card-reviews").prepend(logDiv);
}

// Called every time the page is loaded
function useStorage() {
  if (localStorage.getItem("userLogs") !== null) {
    var y = localStorage.getItem("userLogs");
    saveArray = JSON.parse(y);
    console.log(saveArray);

    for (i = 0; i < saveArray.length; i++) {
      displayLog(saveArray[i]);
    }
  }
}

function deleteLog(event) {
  event.preventDefault();
  event.stopPropagation();

  var y = localStorage.getItem("userLogs");
  saveArray = JSON.parse(y);

  var uniqueVal = $(this).closest(".logDiv").data().unique;


//   Modal should appear now, if else statement allows this function to continue if Modal selection is true and function should quit if Modal selection is false

  for (i = 0; i < saveArray.length; i++) {
    if (saveArray[i].uniqueId == uniqueVal) {
      saveArray.splice(i, 1);
      localStorage.setItem("userLogs", JSON.stringify(saveArray));
      location.reload();
    }
  }
}
