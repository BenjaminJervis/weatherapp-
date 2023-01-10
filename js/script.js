
// variables created to use throught my code 

var APIKey = "248d7de9bed9fdf91deaad258386e3f8"; //open weather api key added 
var displayWeather;
var city = [];
var searchedCity;
var citySearch;
var storedCity;
var lastCitySearched;
var lastCity;


searchedCity = document.getElementById ("search-city") 
citySearch = document.getElementById ("city-input")
searchedCity.addEventListener("click",handleWeatherSearch); //on click for search button added 
function handleWeatherSearch (){ //function added to fetch weather data
	console.log("hello")

	}
if (localStorage.getItem("city")) {
	storedCity = JSON.parse(localStorage.getItem("city"));
	console.log(searchedCity);
	for (var i = 0; i < storedCity.length; i++) {
				lastCitySearched = storedCity.length - 1;
				var lastCity = storedCities[lastCitySearched];
			}
	} else {
			city;
	}
	//renderlastCitySearch();
	console.log("city", city);
		
	// WHEN I search for a city
	// search for a city and store in local storage
	$("#search-city").on("click", function (event) {
			event.preventDefault();
			// get value of city input
			var city = $("#city-chosen").val();
			console.log(city);
	})

	var queryURL1 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${APIKey}`;
	// AJAX request using the above URL created using the open weather api 
	$.ajax({
		url: queryURL1,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		lat = response.coord.lat; //lat and lon data displayed here 
		lon = response.coord.lon;
	}

	)
	var cityItem = $("<li>"); // render to below the weather dashboard header 
	cityItem.addClass("list-group-item city-item");
	cityItem.text(response.name);
	cityItem.attr("lat", response.coord.lat); //append the latitude data 
	cityItem.attr("lon", response.coord.lon); //append the longtitude data 
	$("#city-list").prepend(cityItem);

	// When city item is clicked, this will re render information for the city and the forecast
	cityItem.on("click", function () {
		lat = $(this).attr("lat");
		lon = $(this).attr("lon");
		renderCityName(response);
		renderCityInfo(lat, lon);
	});

	//this function will add a current date, city name, and weather icon 
	function renderCityName(response) {
		//get current date
		var currentDate = moment().format("L"); //uses moment js to add current date 
		$(".card-title").text(`${response.name} (${currentDate})`);
		var weatherIcon = $("<img>"); // adds a weather icon 
		var iconCode = response.weather[0].icon;
		var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
		weatherIcon.attr("src", iconUrl);
		$(".card-title").append(weatherIcon); //appends the weather icon to the top of the page 
	}

// push city input to cities array
		cities.push(city);
//store cities in localStorage
		localStorage.setItem("city", JSON.stringify(city));

var cityItem = $("<li>");
	cityItem.addClass("list-group-item city-item");
	cityItem.text(response.name);
	cityItem.attr("lat", response.coord.lat);
	cityItem.attr("lon", response.coord.lon);
	$("#city-list").prepend(cityItem);

// When city item is clicked, re render info and forecast
	cityItem.on("click", function () {
	lat = $(this).attr("lat");
	lon = $(this).attr("lon");
	renderCityName(response);
	renderCityInfo(lat, lon);
});

function renderLastCityInfo() {
	$("#city-list").clear;
	var weatherURL1 =
	weatherURL1=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${APIKey}`;

	$.ajax({
	URL: weatherURL1,
	method: "GET",
})
	.then(function (response) {
	console.log(response);
	lat = response.coord.lat;
	lon = response.coord.lon;

	renderCity_Name(response);
	renderCity_Info(lat, lon);
});

}

function renderCity_Name(response) {
//get current date
	var currentDate = moment().format("L");
// render city name, current date in day, month and year and display the weather icon
	$(".card-title").text(`${response.name} (${currentDate})`);
	var weatherIcon = $("<img>");
	var iconCode = response.weather[0].icon;
	var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
	weatherIcon.attr("src", iconUrl);
	$(".card-title").append(weatherIcon);
}

// This lets me view the current day and the weather conditions 
function renderCity_Info(lat, lon) {
	var weatherURL2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
console.log("renderCity_Name")
	$.ajax({
	url: weatherURL2,
	method: "GET",
	}).then(function (response) {
// I then append the following to am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
	$("#temperature").text(`Temperature: ${current.temp} \xB0F`);
	$("#humidity").text(`Humidity: ${humidity}%`);
	$("#wind-speed").text(`Wind Speed: ${wind_speed} MPH`);
	$("#uv-index").text(`UV Index:`);

// render 5-Day Forecast
	displayForecast(response);
});
}

function displayForecast(response) {
	$("#forecast").empty();
	// Renders 5-day forecast to the HTML to display to the user 
	var days = response.daily;
	// get the 2nd - 6th index of the daily array of the response
	days.slice(1, 6).map((day) => {
	var dayCard = $("<div>");
	dayCard.addClass("card col-md-4 daycard");
// dayCard.css("width");
	dayCard.css("background-color", "orange");
	dayCard.css("margin-right", "5px");
	dayCard.css("font-size", "15px");
// adds the card body dynamically 
	var dayCardBody = $("<div>");
	dayCardBody.addClass("card-body");
	dayCard.append(dayCardBody);
// displays the city name 
	var dayCardName = $("<h6>");
	dayCardName.addClass("card-title");
// take the date of the response object and format it to (MM/DD/YYYY)
	var datestamp = moment.format(day.dt);
	var forecastDate = datestamp.format("L");
	dayCardName.text(forecastDate);
	dayCardBody.append(dayCardName);

//This adds the icon of the response object and set the url to the src of the iconURL
	var weatherIcon = $("<img>");
	var iconCode = day.weather[0].icon;
	var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
	weatherIcon.attr("src", iconUrl);
	dayCardBody.append(weatherIcon);
//displays the days temperature 
	var dayTemp = $("<p>");
	dayTemp.text(`Temp: ${day.temp.max} \xB0F`);
	dayCardBody.append(dayTemp);
//displays the days humidity 
	var dayHumidity = $("<p>");
	dayHumidity.text(`Humidity: ${day.humidity}%`);
	dayCardBody.append(dayHumidity);

	$("#forecast").append(dayCard);
});
}


