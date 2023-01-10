
var APIKey = "248d7de9bed9fdf91deaad258386e3f8"; //open weather api key added 

searchCity = document.getElementById ("search-city") 
citySearch = document.getElementById ("city-input")
searchCity.addEventListener("click",handleWeatherSearch); //on click for serach button added 
function handleWeatherSearch (){ //function added to fetch weather data
	//console.log("handleWeatherSearch!")
	if(!citySearch.value){
		return;
	} 
	let city = citySearch.value.trim();
	//console.log("city = ", city);
	fetchGeoLocation (city); //function added to fetch geolocation of city i am searching 
}

function fetchGeoLocation(city){
	//console.log ("fetchGeoLocation: city = ", city);
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
			//console.log("data = ", data)
			addToHistory(city);
			fetchWeatherForcast(data[0]);
		}
	})
	//.catch(function(err){
		//console.log(err);
		
	}

function addToHistory(city){ //function to add weather data to local storage 
	
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
	//.then(function (data){
		//console.log("weatherData= ", data);
		//displayWeather(city, data)
	//})
	//.catch(function (err){
		//console.error(err)
	//})
};
//function displayWeather (city, data){
	//to be completed 
//}



console.log(APIKey)