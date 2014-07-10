window.onload = function() {
  // establishes initial banner upper margin
  positionBanner();
  // begins method chain that ultimately
  // generates JSON of nearby events.
  getLocation();
  // banner upper margin responds to window resize
  $(window).resize(positionBanner);
  // transition from banner to event feed
  $("[data-component='discover']").on('click', function() {
    $(window).unbind("resize");
    shrinkBanner();
    shrinkTitle();
    fadeBannerButtons();
    prepareEvents();
  });
  // transition from banner to add form
  $("[data-component='create']").on('click', function() {
    $(window).unbind("resize");
    // banner height responds to window resize
    $(window).resize(adjustBannerHeight);
    growBanner();
    shrinkTitle();
    fadeBannerButtons();
    $(document).find("[data-component='add_event_form_container']").fadeIn(1500);
  });
}

// handles positioning of banner by setting
// upper margin relative to the viewport height.
function positionBanner() {
  $("[data-component='banner']").css("margin-top", $(window).height()/4 + "px")
  $("[data-component='banner']").show();
}

// handles the height of the banner so that it fills the viewport
function adjustBannerHeight() {
  $("[data-component='banner']").css("height", $(window).height() + "px")
}

// shrinks upper padding and font size of the title
function shrinkTitle() {
  $("[data-component='banner']").find("[data-component='banner_title']").animate({
    "padding-top": "-=3.7rem",
    "font-size": "-=2rem"
  }, "slow");
}

// grows the banner to fill the viewport
function growBanner() {
  $("[data-component='banner']").animate({
    "margin-top": "0px",
    "height": $(window).height()
  }, "slow");
}

// shrinks the banner to the size of a nav bar
function shrinkBanner() {
  $("[data-component='banner']").animate({
    "margin-top": "-=" + $(window).height()/4 + "px",
    "height": "-=12rem"
  }, "slow");
}

// fades in the events and quickly hides their info panels
function prepareEvents() {
  $("[data-component='event']").fadeIn("slow");
  $(document).find("[data-component='info_panel']").slideUp("fast");
}

// fades out the "create" and "discover" buttons
function fadeBannerButtons() {
  $("[data-component='banner']").find("[data-component='discover']").fadeOut();
  $("[data-component='banner']").find("[data-component='create']").fadeOut();
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
    // grab the particular segment of the JSON response that
    // represents a single event and stores it as an object.
    var event_object = data[i];
    // create a new event panel from the template
    var $new_panel = $(template);
    // set the parts of the panel
    $new_panel.find("[data-component='image_panel']").css("background-image", "url(" + event_object.imgurl + ")");
    $new_panel.find("[data-component='event_title']").text(event_object.title);
    // $new_panel.find("[data-component='event_date']").text(event_object.datetime);
    $new_panel.find("[data-component='info_panel_text_container']").text(event_object.description);
    // add the newly created panel to the DOM
    $("[data-component='event_feed_container']").append($new_panel);
  }
}

// controls sliding event info panels. it must be added as a document
// listener, because event elements are being appened to the DOM after load.
$(document).on('click',"[data-component='event']",function(){
  // slide up all panels that ARE NOT associated with the event target (if any)
  $("[data-component='info_panel']").not($(this).find("[data-component='info_panel']")).slideUp();
  // slide down the panel that IS associated with the event target
  $(this).find("[data-component='info_panel']").slideToggle();
});

