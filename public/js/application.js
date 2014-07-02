
// controls event_info opening and closing
// $('.event').on('mouseover', function(){
//   $(this).find('.event_info').slideDown();
// });
// $('.event').on('mouseleave', function(){
//   $(this).find('.event_info').slideUp();
// });

$('.event').on('click', function(){
  $(this).find('.event_info').slideToggle();
});

$('#create_button').on('click', function(){
  $('.new_event_form').show();
  $('#create_button').hide();
  $('#discover_button').hide();
});