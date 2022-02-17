// Weather App using Weatherstack and Mapbox

require("dotenv").config(); // must also install dotenv: npm i dotenv

const request = require("request");
const city = "Holzhausen, Sulz am Neckar";
const locationURL = "http://api.weatherstack.com/current?access_key=" + process.env.WEATHER_API_KEY + "&query=" + city + "&units=m";
const geocodeLocation = "Holzhausen%20Sulz%20am%20Neckar.json";

request({url: locationURL, json:true}, (error, response) => {
  if (error) {
      console.log("There is an error: " + error);
  }
  else if (response.body.error) {
    console.log ("Unable to find location error or another error from Weatherstack.")
  }
  else {
    // console.log ("Weather report for " + city);
    console.log ("Weather report time, " + response.body.current.observation_time + " hours");
    console.log ("Weather Status is " + response.body.current.weather_descriptions);
    console.log ("Temperature is " + response.body.current.temperature + " Celsius");
    console.log ("Temperature feels like " + response.body.current.feelslike + " Celsius");
    console.log ("Cloud Coverage is " + response.body.current.cloudcover + "%");
    console.log ("Precipitation is " + response.body.current.precip + "%");
    console.log ("Wind speed is " + response.body.current.wind_speed + " km/h" + " direction " + response.body.current.wind_dir);
  }
})

setTimeout(function() {
}, 1000);

// Geocoding

const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +  geocodeLocation + "?access_token=" + process.env.MAPBOX_API_KEY + "&limit=1"

request({url: geocodeURL, json:true}, (error, response) => {
  if (error) {
    console.log("There is no connection or another error: " + error);
  }
  else if (response.body.features.length === 0) {
    console.log ("Unable to find location error or another error from Weatherstack.")
  }
  else if (geocodeLocation === "") {
    console.log ("No location given for Weatherstack.")
  }  
  else {
    const longitude = response.body.features[0].center[0];
    const latitude = response.body.features[0].center[1];
    console.log ("Weather report for " + response.body.features[0].place_name);
    console.log ("Location @ latitude " + latitude + " and longitude " + longitude );
    console.log("---------------------------------------------------------------")
  }
})