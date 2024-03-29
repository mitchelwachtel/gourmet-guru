$(document).ready(function () {
  $(".header").height($(window).height());
});

// Declare variables
var inputRestaurant = document.getElementById("inputRestaurant");
var inputCity = document.getElementById("inputCity");
var inputFood = document.getElementById("inputFood");
var inputComment = document.getElementById("inputComment");
var logRevBtn = document.getElementById("logReviewBtn");
var viewRevBtn = document.getElementById("viewRevBtn");
var topBtn = document.getElementById("btn-back-to-top");
var saveArray = [];

logRevBtn.addEventListener("click", navigateToSection);
viewRevBtn.addEventListener("click", navigateToSection);

//Display top button when user scrolls down
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

topBtn.addEventListener("click", navigateToSection);

// End of display top button

var starCount;
var i;

$("#searchBtn").on("click", validateInputs);
$("#card-reviews").on("click", ".delete-button", deleteLog);

// Function to validate the input form fields
function validateInputs(event) {
  event.preventDefault();

  var city = inputCity.value.trim();
  var food = inputFood.value.trim();
  var restaurant = inputRestaurant.value.trim();

  if (city == "") {
    $("#input-city").removeClass("success");
    $("#input-city").addClass("error");
  } else {
    $("#input-city").removeClass("error");
    $("#input-city").addClass("success");
  }

  if (food == "") {
    $("#input-food").removeClass("success");
    $("#input-food").addClass("error");
  } else {
    $("#input-food").removeClass("error");
    $("#input-food").addClass("success");
  }

  if (restaurant == "") {
    $("#input-restaurant").removeClass("success");
    $("#input-restaurant").addClass("error");
  } else {
    $("#input-restaurant").removeClass("error");
    $("#input-restaurant").addClass("success");
  }

  if (city != "" && food != "" && restaurant != "") {
    processInputs();
    toggleModal();
  } else {
    return;
  }
}

// Function to calculate the star ratings
const ratingStars = [...document.getElementsByClassName("rating__star")];
executeRating(ratingStars);
function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (starCount === "undefined") {
        starCount = "No";
      } else {
        starCount = i + 1;
      }

      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}

// Function to navigate to different sections of the page
function navigateToSection() {
  var btnclicked = $(this).attr('id');
    if(btnclicked === "logReviewBtn") {
      $('html, body').animate({
        scrollTop: $("#input-form").offset().top
    }, 1500);
    }
    else if((btnclicked === "viewRevBtn") || (btnclicked === "logs-button")) {
        $('html, body').animate({
          scrollTop: $("#view-reviews").offset().top
      }, 1500);
    }
    else  {
      $('html, body').animate({
        scrollTop: 0
    }, 1500);
  }
}

function processInputs() {
  if (starCount === undefined) {
    starCount = "No";
  }

  // Grab the City and Query
  var city = inputCity.value;
  var restaurantQuery = inputRestaurant.value;
  var food = inputFood.value;
  var rating = starCount;
  var comment = inputComment.value;

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
    rating: rating + " Star Rating",
    comment: comment,
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

        queryObject.calories = data.calories.value;
        saveArray.push(queryObject);
        localStorage.setItem("userLogs", JSON.stringify(saveArray));
        displayLog(queryObject);
        clearForm();
      });
  }
}

function displayLog(queryObject) {
  //   Create card and append it to div

  // Create columns to display cards
  var cardCols = $("<div></div>");
  cardCols.addClass("col-lg-4 col-md-6 col-sm-12 pb-4 card-column");
  
  var logDiv = $("<div></div>");
  logDiv.addClass("logDiv");
  logDiv.addClass("card p-3");
  logDiv.attr("data-unique", queryObject.uniqueId);

  var a = $("<h3>" + queryObject.restaurant + "</h3>");
  a.addClass("restaurant card-header");
  logDiv.append(a);

  // Create card header
  var cardBody = $("<div></div>");
  cardBody.addClass("card-body");
  logDiv.append(cardBody);
  
  var b = $("<p>" + queryObject.date + "</p>");
  b.addClass("date card-text");
  cardBody.append(b);
  

  var c = $("<p>" + queryObject.city + ", " + queryObject.state + "</p>");
  c.addClass("city-state card-text");
  cardBody.append(c);
  

  var d = $("<p>" + queryObject.address + "</p>");
  d.addClass("address card-text");
  cardBody.append(d);
  

  var e1 = $("<p>" + queryObject.food + "</p>");
  e1.addClass("food card-text");
  cardBody.append(e1);
  

  var e2 = $("<p>Calories: " + queryObject.calories + "</p>");
  e2.addClass("calories card-text");
  cardBody.append(e2);


  var f = $("<p>" + queryObject.rating + "</p>");
  f.addClass("rating card-text");
  cardBody.append(f);


  var g = $("<p>" + queryObject.comment + "</p>");
  g.addClass("comment card-text");
  cardBody.append(g);
  

  var h = $("<button>Delete</button>");
  h.addClass("delete-button btn custom-btn");
  cardBody.append(h);
  

  $("#card-reviews").prepend(cardCols);
  cardCols.prepend(logDiv);
}

// Called every time the page is loaded
function useStorage() {
  if (localStorage.getItem("userLogs") !== null) {
    var y = localStorage.getItem("userLogs");
    saveArray = JSON.parse(y);

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


  for (i = 0; i < saveArray.length; i++) {
    if (saveArray[i].uniqueId == uniqueVal) {
      saveArray.splice(i, 1);
      localStorage.setItem("userLogs", JSON.stringify(saveArray));
      location.reload();
    }
  }
}

function clearForm() {
  inputCity.value = null;
  inputFood.value = null;
  inputRestaurant.value = null;
  inputComment.value = null;
  $("#input-city").removeClass("success");
  $("#input-food").removeClass("success");
  $("#input-restaurant").removeClass("success");
  $("#stars").children("i").removeClass("fas");
  $("#stars").children("i").addClass("far");
}
var seeLogsBtn = $('#logs-button')
function toggleModal () {
$('.modal').modal("toggle");
};
seeLogsBtn.on('click', navigateToSection)
seeLogsBtn.on('click', toggleModal) 
