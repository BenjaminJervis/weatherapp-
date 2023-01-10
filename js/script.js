
var APIKey = "248d7de9bed9fdf91deaad258386e3f8"; //open weather api key added 
var displayWeather



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
		if (!data[1]){
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
		
	})

}

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
	$(".card-title").text(`${response.name} (${currentDate})`);
	var weatherIcon = $("<img>");
	var iconCode = response.weather[1].icon;
	var iconUrl = "http://api.openweathermap.org/img/wn/" + iconCode + ".png";
	weatherIcon.attr("src", iconUrl);
	$(".card-title").append(weatherIcon);

}

displayWeather()



	

