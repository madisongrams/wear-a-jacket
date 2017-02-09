

$(document).ready(function(){

    var getWeather = function() {

      var city = $('#term').val();

      if (city == '') {
          $('#weatherData').html("<h3> Enter a city!</h3>");
      } else {
          $('#weatherData').html("<h3> Retrieving weather info...</h3>");
          $.getJSON("http://api.openweathermap.org/data/2.5/find?q=" + city +
          "&type=like&callback=?&APPID=a1f60ac3046896aea81666eb8854d7cc", function(json) {
            console.log(json);
            if (json.cod == "200") {
                var temp = json.list["0"].main.temp;
                temp = Math.round(1.8 * (temp - 273) + 32);
                var jacket;
                if (temp < 60) {
                    jacket = "you should probably wear a jacket."
                } else {
                    jacket = "you'll be fine without a jacket!"
                }
                $('#weatherData').html('<h3>You\'re in '+ json.list["0"].name + "! The temperature is " + temp + ' degrees fahrenheit!</h3><br/> <p>' + jacket + '</p>');
            } else {
            $('#weatherData').html("<h3>Can't find that city...</h3>");

}
          });
      }
      return false;
    }
    $('#search').click(getWeather);
});
