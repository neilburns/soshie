
// controls event_info opening and closing
// $('.event').on('mouseover', function(){
//   $(this).find('.event_info').slideDown();
// });
// $('.event').on('mouseleave', function(){
//   $(this).find('.event_info').slideUp();
// });

// controls sliding event info panels
$('.event').on('click', function(){
  $('.event_info_panel').not($(this).find('.event_info_panel')).slideUp();
  $('.event_info_text_container').not($(this).find('.event_info_text_container')).slideUp();
  $(this).find('.event_info_panel').show();
  $(this).find('.event_info_text_container').slideToggle();
});

// opens new event form
$('#create_button').on('click', function(){
  $('.new_event_form').show();
  $('#create_button').hide();
  $('#discover_button').hide();
});