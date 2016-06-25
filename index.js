$(function(){

  $('input[type="submit"]').click(function(){
    var zip = $('#zip').val();
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&APPID=';

    $.getJSON(weatherAPI, function(response){
      var weather_data = response;

      $('.location').html("Location: " + weather_data["name"])
    });
  });

});
