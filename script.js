function getWeather(url, units, fromLocation) {
  $('#weatherData').html("<h3> Retrieving weather info...</h3>");
  $.getJSON(url, function(json){
    console.log(json);
    if (json.cod == "200" && (json.count > 0 || fromLocation)) {
        var temp = Math.round(json.list["0"].main.temp);

        var jacket;
        if ((temp < 60 && units == "imperial") || (temp < 15.5)) {
            jacket = "you should probably wear a jacket.";
        } else {
            jacket = "you'll be fine without a jacket!";
        }
        if (units == "imperial") {
            $('#weatherData').html('<h3>You\'re in '+ json.list["0"].name + "! The temperature is " + temp + ' degrees fahrenheit!</h3><br/> <p>' + jacket + '</p>');
        } else {
          $('#weatherData').html('<h3>You\'re in '+ json.list["0"].name + "! The temperature is " + temp + ' degrees celsius!</h3><br/> <p>' + jacket + '</p>');
        }
    } else {
        $('#weatherData').html("<h3>Can't find that city...</h3>");
    }
  });
}

$(document).ready(function(){
    var getLocationByCoords = function() {
      console.log("called");
      var units = $('input[name=temp]:checked').val();
        if ("geolocation" in navigator) {
          $('#weatherData').html("<h3>Finding location</h3>");
          navigator.geolocation.getCurrentPosition(function(position) {
              var lat = position.coords.latitude;
              var long = position.coords.longitude;
              var url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=imperial&APPID=a1f60ac3046896aea81666eb8854d7cc';
              getWeather(url, units, true);
          });
        } else {
            $('#weatherData').html("<h3>Can't find location.</h3>");
            return false;
        }
        return false;
    }
    var getLocationBySearch = function() {
          var units = $('input[name=temp]:checked').val();
          var cityZip = $('#term').val();
          var country = $('#country').find(":selected").val();
          if (cityZip == '') {
              $('#weatherData').html("<h3> Enter a city!</h3>");
              return false;
          } else {
              var url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/find?q=' + cityZip + ',' + country + '&units=' + units + '&type=like&APPID=a1f60ac3046896aea81666eb8854d7cc';
              getWeather(url, units, false);
          }
      return false;
    }

    $('#search').click(getLocationBySearch);
    $('#location').click(getLocationByCoords);
});
