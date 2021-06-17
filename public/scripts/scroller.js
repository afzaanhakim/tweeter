
//scrolling button to top

$(document).ready(function() {
  $('#scrollup').hide() //hiding scroll when page loads
  $("#scrollup").click(function(event) {
      event.preventDefault(); //preventing button show when reached top
      $("html, body").animate({ scrollTop: 0 }, "slow");
  });

});

$(window).on("scroll",function() {
  const top = $(this).scrollTop()
  if (top === 0) { 
      $('#scrollup').fadeOut();
  } else {
      $('#scrollup').fadeIn();
  }
});