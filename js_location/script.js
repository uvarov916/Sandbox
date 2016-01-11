"use strict";

$("#error").hide();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotLocation, gotError);
} else {
    displayError("Your browser doesn't support geolocation.");
}


function gotLocation(currentPosition) {

    var loadingIndicator = $("#loading-indicator");
    var tempTag = $("#temperature");
    var nameTag = $("#location-name"); 

    var forecastApiKey = "97b429b5400c7110f209ae571437be6b";
    var forecastBaseUrl = "https://api.forecast.io/forecast/";
    var geocodingApiKey = "AIzaSyAEokMIw4n0LyczRhF3Qrmo-_HZCnHFdKM";
    var geocodingBaseUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";   

    
    var latitude = currentPosition.coords.latitude;
    var longitude = currentPosition.coords.longitude;

    var forecastUrl = forecastBaseUrl + forecastApiKey + "/" + latitude + "," + longitude;
    var geocodingUrl = geocodingBaseUrl + latitude + "," + longitude + "&key=" + geocodingApiKey;

    $.ajax({ url: forecastUrl }).done(function(data) {
        tempTag.html(fahrenheitToCelcius(data.currently.temperature) + "&deg;C");

        $.ajax({ url: geocodingUrl }).done(function(data) {
            nameTag.html(data.results[0].formatted_address);

            loadingIndicator.hide();
            tempTag.show();
            nameTag.show();
        });

    });
}

function displayError(message) {
    $("#error p").text(message);
    $("#error").show();
}

function gotError(err) {
    var message;

    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "You need to give permission to use your location.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "There was an issue getting your location. Please refresh the page.";
            break;
        case error.TIMEOUT:
            message = "It took too long getting your position.";
            break;
        default:
            message = "An unknown error has occured. Please refresh the page.";
    }

    displayError(message);
}

function fahrenheitToCelcius(f) {
    return Math.round((f - 32) * 5 / 9);
}