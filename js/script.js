
var APIKey = "248d7de9bed9fdf91deaad258386e3f8"; //open weather api key added 


searchCity = document.getElementById ("search-city") 
citySearch = document.getElementById ("city-input")
searchCity.addEventListener("click",handleWeatherSearch); //on click for search button added 
function handleWeatherSearch (){ //function added to fetch weather data
	console.log("handleWeatherSearch!")
	if(!citySearch.value){
		return;
	} 
	let city = citySearch.value.trim();
	console.log("city = ", city);
	fetchGeoLocation (city); //function added to fetch geolocation of city i am searching 
}

function fetchGeoLocation(city){ // function to display geo location data lat and lon 
	console.log ("fetchGeoLocation: city = ", city);
	let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${APIKey}`;
	fetch (url)
	.then(function (response){
		return response.json();
	})
	.then(function (data){
		if (!data[0]){
			alert ("city not found");
		}
		else {
			console.log("data = ", data)
			addToHistory(city);
			fetchWeatherForcast(data[1]);
		}
	})
	.catch(function(err){
		console.log(err);
		
	}
	)

function addToHistory(city){ //function to add weather data to local storage 
	//to be completed
}

function fetchWeatherForcast(data){ //function to display the 5 day weather forcast 
	
	let {lat}=data;
	let {lon}=data;
	let city = data.name;
	let weatherURL=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

	fetch (weatherURL)
	.then(function(response){
		return response.json();

	})
	.then(function (data){
		//console.log("weatherData= ", data);
		displayWeather(city, data)
	})
	//.catch(function (err){
		//console.error(err)
	};
		// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
		$("#temperature").text(`Temperature: ${response.current.temp} \xB0F`);
		$("#humidity").text(`Humidity: ${response.current.humidity}%`);
		$("#wind-speed").text(`Wind Speed: ${response.current.wind_speed} MPH`);
		$("#uv-index").text(`UV Index: `);

//to be completed 
function displayWeather(response) {
	//get current date
	var currentDate = moment().format("L");
	// render city name, current date and weather icon
	$("#card-title").text(`${response.name} (${currentDate})`);
	var weatherIcon = $("<img>");
	var iconCode = response.weather[0].icon;
	var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
	weatherIcon.attr("src", iconUrl);
	$("#card-title").append(weatherIcon);

}
}

function renderForecast(response) {
	$("#forecast").empty();
	// Render 5-day forecast
	// var n = 5;
	var days = response.daily;
	// get the 2nd - 6th index of the daily array of the response
	days.slice(1, 6).map((day) => {
		var dayCard = $("<div>");
		dayCard.addClass("card col-md-4 daycard");
		// dayCard.css("width", "18rem");
		dayCard.css("background-color", "orange");
		dayCard.css("margin-right", "5px");
		dayCard.css("font-size", "15px");

		var dayCardBody = $("<div>");
		dayCardBody.addClass("card-body");
		dayCard.append(dayCardBody);

		var dayCardName = $("<h6>");
		dayCardName.addClass("card-title");
		// take the date of the response object and format it to (MM/DD/YYYY)
		var datestamp = moment.unix(day.dt);
		var forecastDate = datestamp.format("L");
		dayCardName.text(forecastDate);
		dayCardBody.append(dayCardName);

		//take the icon of the response object and set the url to the src of the iconURL
		var weatherIcon = $("<img>");
		var iconCode = day.weather[0].icon;
		var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
		weatherIcon.attr("src", iconUrl);
		dayCardBody.append(weatherIcon);

		var dayTemp = $("<p>");
		dayTemp.text(`Temp: ${day.temp.max} \xB0F`);
		dayCardBody.append(dayTemp);

		var dayHumidity = $("<p>");
		dayHumidity.text(`Humidity: ${day.humidity}%`);
		dayCardBody.append(dayHumidity);

		$("#forecast").append(dayCard);
	});
}


	

