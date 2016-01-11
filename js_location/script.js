$(document).ready(function() {
    "use strict";

    var loadingIndicator = $("#loading-indicator");
    var tempTag = $("#temperature");
    var nameTag = $("#location-name"); 

    var forecastApiKey = "97b429b5400c7110f209ae571437be6b";
    var forecastBaseUrl = "https://api.forecast.io/forecast/";
    var geocodingApiKey = "AIzaSyAEokMIw4n0LyczRhF3Qrmo-_HZCnHFdKM";
    var geocodingBaseUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";   

    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var forecastUrl = forecastBaseUrl + forecastApiKey + "/" + latitude + "," + longitude;
        var geocodingUrl = geocodingBaseUrl + latitude + "," + longitude + "&key=" + geocodingApiKey;

        $.ajax({ url: forecastUrl }).done(function(data) {
            tempTag.html(fahrenheitToCelcius(data.currently.temperature) + "&deg;C");

            $.ajax({ url: geocodingUrl }).done(function(data) {
                nameTag.html(data.results[0].formatted_address);

                loadingIndicator.css("display", "none");
                tempTag.css("display", "block");
                nameTag.css("display", "block");
            });

        });
    });
});


function fahrenheitToCelcius(f) {
    return Math.round((f - 32) * 5 / 9);
}