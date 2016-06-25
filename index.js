$(function(){

  $('input[type="submit"]').click(function(){
    var zip = $('#zip').val();
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&APPID=' + API_KEY;

    $.getJSON(weatherAPI, function(response){
      var weather_data = response;
      var temperature_far = Math.round(1.8 * (weather_data["main"]["temp"] - 273) + 32);

      if (weather_data["weather"].length === 1){
        var description = weather_data["weather"][0]["description"];
      }
      else {
        var description = "";
        weather_data["weather"].forEach(get_descriptions);
        function get_descriptions(item) {
          description = description + item["description"] + " "
        }; 
      }

      $('.location').html(weather_data["name"]);
      $('.description').html(description);
      $('.temperature').html(temperature_far)
    });
  });

});
