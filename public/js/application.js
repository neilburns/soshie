
// controls event_info opening and closing
// $('.event').on('mouseover', function(){
//   $(this).find('.event_info').slideDown();
// });
// $('.event').on('mouseleave', function(){
//   $(this).find('.event_info').slideUp();
// });

window.onload = function() {
  // grabs location of user device
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          alert("Geolocation is not supported by this browser.")
      }
  }
  // sends location to index
  function showPosition(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $.ajax({
        url: '/',
        type: 'get',
        data: {latitude: latitude, longitude: longitude},
      });
  }
  getLocation();
}

// controls sliding event info panels
$('.single_event').on('click', function(){
  $('.info_panel').not($(this).find('.info_panel')).slideUp();
  $('.info_panel_text_container').not($(this).find('.info_panel_text_container')).slideUp();
  $(this).find('.info_panel').show();
  $(this).find('.info_panel_text_container').slideToggle();
});

// opens new event form
$('#create_button').on('click', function(){
  $('.new_event_form').show();
  $('#create_button').hide();
  $('#discover_button').hide();
});