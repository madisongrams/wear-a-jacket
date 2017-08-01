$(document).ready(function(){

    var getWeather = function() {

      var cityZip = $('#term').val();
      var country = $('#country').find(":selected").val();
      var units = $('input[name=temp]:checked').val();
      console.log(units);
      console.log(country);

      if (cityZip == '') {
          $('#weatherData').html("<h3> Enter a city!</h3>");
      } else {
          $('#weatherData').html("<h3> Retrieving weather info...</h3>");
          $.getJSON("http://api.openweathermap.org/data/2.5/find?q=" + cityZip + "," + country + "&units=" + units + "&type=like&callback=?&APPID=a1f60ac3046896aea81666eb8854d7cc", function(json) {
            console.log(json);
            if (json.cod == "200" && json.count > 0) {
                var temp = Math.round(json.list["0"].main.temp);
           
                var jacket;
                if ((temp < 60 && units == "imperial") || (temp < 15.5)) {
                    jacket = "you should probably wear a jacket."
                } else {
                    jacket = "you'll be fine without a jacket!"
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
      return false;
    }
    $('#search').click(getWeather);
});
