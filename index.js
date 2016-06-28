$(function(){
  $('.weather').hide();

  $('.submit').click(function(){
    $('.icons').html('')
    var zip = $('#zip').val();
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&APPID=' + API_KEY;

    $.getJSON(weatherAPI, function(response){
      var weather_data = response;
      var temperature_far = Math.round(1.8 * (weather_data["main"]["temp"] - 273) + 32);

      if (weather_data["weather"].length === 1){
        var description = weather_data["weather"][0]["description"];
        var icon = weather_data["weather"][0]["icon"];
        var icon_url = "http://openweathermap.org/img/w/" + icon + ".png"
        $('.icons').prepend('<img class="weather-icon" src=' + icon_url + ' />')
      }
      else {
        var descriptions = [];
        var icons = []
        
        weather_data["weather"].forEach(get_descriptions);
        function get_descriptions(item) {
          descriptions.push(item["description"])
        };

        var description = descriptions.join();
        
        weather_data["weather"].forEach(get_icons); 
        function get_icons(item) {
          icons.push(item["icon"])
        };

        var icon_urls = icons.map(function(icon) {
          var icon_url = "http://openweathermap.org/img/w/" + icon + ".png";
          return icon_url;
        });

        icon_urls.forEach(add_icon);
        function add_icon(url) {
          $('.icons').append('<img class="weather-icon" src=' + url + ' />')
        };
      }

      $('.location').html(weather_data["name"]);
      $('.description').html(description);
      $('.temperature').html(temperature_far + ' &#8457');

    });
    $('.zipcode').fadeOut();
    $('.weather').delay(600).fadeIn();
  });

});
