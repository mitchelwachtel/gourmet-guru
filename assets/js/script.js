var query;
var lat;
var lon;
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
    console.log(data);
  });

  $(document).ready(function(){
    $('.header').height($(window).height());
  })

  var inputRestaurant = document.getElementById('inputRestaurant');
  var inputCity = document.getElementById('inputCity');
  var searchBtn = document.getElementById('searchBtn');

  searchBtn.addEventListener('click', function () {
    console.log(inputRestaurant.value);
    console.log(inputCity.value);
    
  })