// on window load, run these methods
// that manipulate the built-in HTML5
// navigator.
window.onload = function() {
  // grabs coordinates of user device
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          alert("Geolocation is not supported by this browser.")
      }
  }

  // sends coordinates to index route
  function showPosition(position) {
    $.ajax({
      url: '/location',
      type: 'get',
      data: {latitude: position.coords.latitude, longitude: position.coords.longitude},
      success: function(response) {
        // append the retrieved events
        writePanels($.parseJSON(response));
      }
    });
  }
  // begins method chain
  getLocation();
}

// appends "single_events" to the DOM
function writePanels(data) {
  // grab the event panel template from the DOM
  var template = $.trim($('.panel_template').html());
  for (var i = 0; i < data.length; i++) {
    // grab the particular segment of the JSON
    // response that represents a single event
    // and stores it as an object.
    var event_object = data[i];
    // create a new event panel from the template
    var $new_panel = $(template);
    // set the parts of the panel
    // $new_panel.find('.single_event').show();
    $new_panel.find(".image_panel").css("background-image", "url(" + event_object.imgurl + ")");
    $new_panel.find(".event_title").text(event_object.title);
    $new_panel.find(".event_date").text(event_object.date);
    $new_panel.find(".info_panel_text_container").text(event_object.description);
    // add the newly created panel to the DOM
    $("#event_feed_container").append($new_panel);
  }
}

// controls sliding event info panels.
// must be added as a document listener,
// because "single_event" elements are
// being appened to the DOM after load.
$(document).on('click','.single_event',function(){
  // slide up all panels and containers that
  // are NOT associated with the event target.
  $('.info_panel').not($(this).find('.info_panel')).slideUp();
  $('.info_panel_text_container').not($(this).find('.info_panel_text_container')).slideUp();
  // slide down the panel and container
  // associated with the event target.
  $(this).find('.info_panel').show();
  $(this).find('.info_panel_text_container').slideToggle();
});

