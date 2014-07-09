window.onload = function() {
  // establishes initial banner upper margin
  positionBanner();
  // begins method chain that ultimately
  // generates JSON of nearby events
  getLocation();
  // handles banner upper margin responsivity
  $(window).resize(positionBanner);

  // handles transition from banner to header
  $(document).one('click', function() {
    // move and resize banner
    $("[data-component='banner']").animate({
      "margin-top": "-=" + $(window).height()/4 + "px",
      "height": "-=12rem"
    }, "slow");
    // reposition and resize title
    $("[data-component='banner']").find("[data-component='banner_title']").animate({
      "padding-top": "-=3.7rem",
      "font-size": "-=2rem"
    }, "slow");
    // fade out subtitle
    $("[data-component='banner']").find("[data-component='banner_subtitle']").fadeOut();
    // fade in relevant panels
    $("[data-component='event']").fadeIn("slow");
    // unbind window resize
    $(window).unbind("resize");
  });
}

// handles banner upper margin
function positionBanner() {
  $("[data-component='banner']").css("margin-top", $(window).height()/4 + "px")
  $("[data-component='banner']").show();
}

// grab coordinates of user
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

// send coordinates to index route
function showPosition(position) {
  $.ajax({
    url: '/nearby',
    type: 'get',
    data: {latitude: position.coords.latitude, longitude: position.coords.longitude},
    success: function(response) {
      // save the nearby events
      writePanels($.parseJSON(response));
    }
  });
}

// appends events to the DOM
function writePanels(data) {
  // grab the event panel template from the DOM
  var template = $.trim($("[data-component='event_panel_template']").html());
  for (var i = 0; i < data.length; i++) {
    // grab the particular segment of the JSON
    // response that represents a single event
    // and stores it as an object.
    var event_object = data[i];
    // create a new event panel from the template
    var $new_panel = $(template);
    // set the parts of the panel
    // $new_panel.find('.single_event').show();
    $new_panel.find("[data-component='image_panel']").css("background-image", "url(" + event_object.imgurl + ")");
    $new_panel.find("[data-component='event_title']").text(event_object.title);
    $new_panel.find("[data-component='event_date']").text(event_object.date);
    $new_panel.find("[data-component='info_panel_text_container']").text(event_object.description);
    // add the newly created panel to the DOM
    $("[data-component='event_feed_container']").append($new_panel);
  }
}

// controls sliding event info panels.
// must be added as a document listener,
// because event elements are being appened
// to the DOM after load.
$(document).on('click',"[data-component='event']",function(){
  // slide up all panels and containers that
  // are NOT associated with the event target.
  $("[data-component='info_panel']").not($(this).find("[data-component='info_panel']")).slideUp();
  $("[data-component='info_panel_text_container']").not(
    $(this).find("[data-component='info_panel_text_container']")).slideUp();
  // slide down the panel and container
  // associated with the event target.
  $(this).find("[data-component='info_panel']").show();
  $(this).find("[data-component='info_panel_text_container']").slideToggle();
});

