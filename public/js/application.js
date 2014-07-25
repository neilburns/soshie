window.onload = function() {
  // Begin geolocation and AJAX call.
  geolocate();
  // Establish initial banner position.
  adjustBannerMargin();
  // Banner upper margin responds to window resize.
  $(window).resize(adjustBannerMargin);

  // Transition from banner to event feed.
  $("[data-component='discover']").on('click', function() {
    // Release the banner upper margin.
    $(window).unbind("resize");
    // Animate elements.
    shrinkBanner();
    shrinkTitle();
    fadeBannerButtons();
    prepareEvents();
  });

  // Transition from banner to add event form.
  $("[data-component='create']").on('click', function() {
    // Release the banner upper margin.
    $(window).unbind("resize");
    // Banner height responds to window resize.
    $(window).resize(adjustBannerHeight);
    // Animate elements.
    growBanner();
    shrinkTitle();
    fadeBannerButtons();
    $(document).find("[data-component='create_event_form_container']").fadeIn(1500);
  });

  // Controls sliding event info panels. It must be added as a document listener,
  // because event elements are appened to the DOM after initial window load.
  $(document).on('click',"[data-component='event']",function(){
    // Slide up all panels that ARE NOT associated with the event target (if any).
    $("[data-component='info_panel']").not($(this).find("[data-component='info_panel']")).slideUp();
    // Slide down the panel that IS associated with the event target.
    $(this).find("[data-component='info_panel']").slideToggle();
  });
}

// Handles the positioning of the main banner by setting
// its upper margin relative to the window height.
function adjustBannerMargin() {
  $("[data-component='banner']").css("margin-top", $(window).height()/4 + "px");
  $("[data-component='banner']").show();
}

// Handles the height of the banner so that it fills the window.
function adjustBannerHeight() {
  $("[data-component='banner']").css("height", $(window).height() + "px");
}

// Shrinks the title.
function shrinkTitle() {
  $("[data-component='banner']").find("[data-component='banner_title']").animate({
    "padding-top": "-=3.7rem",
    "font-size": "-=2rem"
  }, "slow");
}

// Grows the banner to fill the window.
function growBanner() {
  $("[data-component='banner']").animate({
    "margin-top": "0px",
    "height": $(window).height()
  }, "slow");
}

// Shrinks the banner to the size of a nav bar.
function shrinkBanner() {
  $("[data-component='banner']").animate({
    "margin-top": "-=" + $(window).height()/4 + "px",
    "height": "-=12rem"
  }, "slow");
}

// Fades in the events and quickly slides up
// their respective info panels, giving the impression
// that the info panels were hidden from the start.
function prepareEvents() {
  $("[data-component='event']").fadeIn("slow");
  // Note: This could also have been achieved using CSS,
  // except "display: none" ultimately overcomplicated
  // the slide toggle feature.
  $(document).find("[data-component='info_panel']").slideUp("fast");
}

// Fades out the banner buttons (create, discover).
function fadeBannerButtons() {
  $("[data-component='banner']").find("[data-component='discover']").fadeOut();
  $("[data-component='banner']").find("[data-component='create']").fadeOut();
}

// Determines the coordinates of the user, requests
// the data of nearby events and triggers the production
// of event elements in the DOM.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          // Using the user's coordinates, request
          // the server for a list of nearby events.
          $.ajax({
            url: '/nearby',
            type: 'get',
            data: {latitude: position.coords.latitude, longitude: position.coords.longitude},
            success: function(response) {
              // Upon successful return, begin producing
              // event elements using the response data.
              writePanels($.parseJSON(response));
            }
          });
        });
    } else {
        // Alert the user if geolocation is unsupported.
        alert("Geolocation is not supported by this browser.")
    }
}

// Given event data, creates and appends new event elements to the DOM.
function writePanels(nearby_events) {
  // Iterate through each event in the nearby events collection.
  for (var i = 0; i < nearby_events.length; i++) {
    // Grab the particular segment of JSON that
    // represents a single event, and store it.
    var event_data = nearby_events[i];
    // Grab the hidden template from the DOM, and use it to create a new event element.
    var $new_panel = $($.trim($("[data-component='event_template']").html()));
    // Populate the various components of the new element with the relevant data.
    $new_panel.find("[data-component='image_panel']").css(
      "background-image", "url(" + event_data.imgurl + ")");
    $new_panel.find("[data-component='event_title']").text(event_data.title);
    $new_panel.find("[data-component='event_date']").text(
      event_data.datetime.match(/\d{2}-\d{2}T/)[0].slice(0, -1).replace(/-/, "/"));
    $new_panel.find("[data-component='info_panel_text_container']").text(event_data.description);
    // Append the newly created panel to the DOM.
    $("[data-component='event_feed_container']").append($new_panel);
  }
  enableDiscover();
}

function enableDiscover() {
  // Enable and change styling of "Discover" button.
  $("[data-component='discover']").text("discover")
  $("[data-component='discover']").removeAttr("disabled");
  $("[data-component='discover']").removeClass("bg-c-gray");
  $("[data-component='discover']").addClass("bg-c-darkpurple active-bg-color");
}