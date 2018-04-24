//FCC
const API_URL = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon, icon, skyicons, weatherCondition, u;
var i = 0;
var tempUnit = "C"

$(document).ready(function () {
    $(".getWeatherBtn").on("click", function () {
        //alert("Fair enough! ");
        $('#myModal').modal('show')
    });

    $("#temp").html("<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>");

    //Browser Fetch Location
    if (navigator.geolocation) {
        var positions = navigator.geolocation.getCurrentPosition(showPosition, showError)

    }
    else {
        $("#temp").html("Geolocation is not supported by this browser.")
    }

    function showPosition(position) {
        lat = "lat=" + position.coords.latitude;
        lon = "lon=" + position.coords.longitude;
        getWeather(lat, lon);
        console.log(lat + " " + lon)
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $("#temp").html("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                $("#temp").html("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                $("#temp").html("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                $("#temp").html("An unknown error occurred.")
                break;
        }
    };

    function getWeather(lat, lon) {
        var urlString = API_URL + lat + "&" + lon;
        $.ajax({
            url: urlString, success: function (result) {

                $("#city").text(result.name + ", ");
                $("#country").text(result.sys.country);
                currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
                $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
                u = $("#unit").text(tempUnit);
                toggleDivs(u);

                weatherCondition = result.weather[0].main.toLowerCase();

                $("#desc").text(result.weather[0].main);
                showWeather(weatherCondition);
            }
        });
    }

    function toggleDivs(u) {
        var currentUnit = $("#unit").text();
        var newUnit = (currentUnit === "C" ? "F" : "C");
        $("#unit").text(newUnit);
        if (newUnit == "F") {
            fahrTempDisplay = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
            $("#temp").text(fahrTempDisplay + String.fromCharCode(176));
        } else {
            $("#temp").text(currentTempInCelsius + String.fromCharCode(176));
        }
        u.animate({ top: 1 }, 2000, function () {
            toggleDivs(u);
        });
    }

    // function showWeather(icon) {
    //     skycons = new Skycons({ "color": "black" }),
    //         list = [
    //             "clear-day", "clear-night", "partly-cloudy-day",
    //             "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
    //             "fog"
    //         ];
    //     for (i = list.length; i--;) {
    //         if (icon == "clouds") {
    //             $(".weather").html("<div class='cloudy'></div>")
    //         } else if (icon == "rain" || icon == "thunderstorm") {
    //             $(".weather").html("<div class='rainy'></div>")
    //         } else if (icon == "haze" || icon === "mist") {
    //             skycons.set("weather-icon", list[9]);
    //             skycons.play();
    //         } else if (icon == "snow") {
    //             $(".weather").html("<div class='snowy'></div>")
    //         } else if (icon == "clear") {
    //             $(".weather").html("<div class='sunny'></div>")
    //         } else {
    //             skycons.remove("weather-icon");
    //             console.log("here");
    //         }
    //     }
    // }

    function showWeather(icon) {
        skycons = new Skycons({ "color": "black" }),
            list = [
                "clear-day", "clear-night", "partly-cloudy-day",
                "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                "fog"
            ];
        for (i = list.length; i--;) {
            if (icon == "clouds") {
                skycons.set("weather-icon", list[4]);
                skycons.play();
            } else if (icon == "rain" || icon == "thunderstorm") {
                skycons.set("weather-icon", list[5]);
                skycons.play();
            } else if (icon == "haze" || icon === "mist") {
                skycons.set("weather-icon", list[9]);
                skycons.play();
            } else if (icon == "snow") {
                skycons.set("weather-icon", list[7]);
                skycons.play();
            } else if (icon == "clear") {
                skycons.set("weather-icon", list[0]);
                skycons.play();
            } else {
                skycons.remove("weather-icon");
                console.log("here");
            }
        }
    }
});