//FCC
const API_URL = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon, icon, skyicons, icons;
var i = 0;
var tempUnit = "C"

$(document).ready(function () {
    $(".getWeatherBtn").on("click", function () {
        restart();

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
            console.log(urlString);
            $.ajax({
                url: urlString, success: function (result) {
                    $("#city").text(result.name + ", ");
                    $("#country").text(result.sys.country);
                    currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
                    $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
                    var u = $("#unit").text(tempUnit);
                    toggleDivs(u);

                    icons = result.weather[0].main.toLowerCase();
                    console.log(icons)
                    $("#desc").text(result.weather[0].main);
                    showWeather(icons);
                }
            });

        }

        function showWeather(icon) {
            console.log(icon)
            skycons = new Skycons({ "color": "black" }),
                list = [
                    "clear-day", "clear-night", "partly-cloudy-day",
                    "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                    "fog"
                ];
                console.log(list);
            for (i = list.length; i--;) {
                console.log(icon);
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

        // function showWeather(value){
        //     var icon = value.weather[0].main.toLowerCase();
        //     console.log(icon);
        // }

        function restart() {
            $("#city").text("");
            $("#country").text("");
            $("#temp").html("<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>");
            $("#unit").text("");

        }

        function toggleDivs(u) {
            var currentUnit = $("#unit").text();
            var newUnit = (currentUnit === "C" ? "F" : "C");
            $("#unit").text(newUnit);
            if (newUnit == "F") {
                fahrTempDisplay = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
                $("#temp").text(fahrTempDisplay + String.fromCharCode(176));
            } else {
                $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
            }
            u.animate({ top: 1 }, 2000, function () {
                toggleDivs(u);
            });
        }
    });


});