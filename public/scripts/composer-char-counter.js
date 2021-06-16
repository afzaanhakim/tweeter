
$(document).ready(function () {


const textArea = $('.new-tweet textarea');

textArea.on('input', function(){
  //console.log( event.target.value.length)
  const inputLength = $(this).val().length
  console.log(inputLength)
  const charLeft = 140 - inputLength
  console.log(charLeft)
$('.counter').text(charLeft)

$(this).find('.counter').text(charLeft)

if (charLeft < 0){

  $('.counter').addClass('limit-exceeded')

}
else {
  $('.counter').removeClass('limit-exceeded')
}

})

});