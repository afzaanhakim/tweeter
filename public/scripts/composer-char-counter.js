//character counter updates the counter everytime text is inputted
$(document).ready(function () {
  const textArea = $(".new-tweet textarea");

  textArea.on("input", function () {
    const inputLength = $(this).val().length;
    const charLeft = 140 - inputLength;
    $(".counter").text(charLeft);

    $(this).find(".counter").text(charLeft);

    //if over character limit then the counter turns red

    if (charLeft <= 0) {
      $(".counter").addClass("limit-exceeded");
    } else {
      $(".counter").removeClass("limit-exceeded");
    }
  });
});
