


const renderTweets = function(data) {
  $('#tweet-container').empty()
  for (let tweet of data){
   let renVal = createTweetElement(tweet)
   $('#tweet-container').append(renVal)
  }
}

const createTweetElement = function(data) {

  


let htmlContent = 
`<article class = "tweet">
<header class = "user-header">
<header class = "friend-profile"> <img class ="avatar" src="${data.user.avatars}"> ${data.user.name} </header>
<header class = "friend-handle"> ${data.user.handle}</header>
</header>
<section class = "tweet-text"> ${data.content.text}</section>
<footer class = "actions"><div class = "time"> ${timeago.format(data.created_at)} </div><div class = icons><i name = "retweet" class="fas fa-retweet"></i>
<i name = "flag" class="fas fa-flag"></i>
<i name = "heart" class="fas fa-heart"></i></div></footer>
</article>`

return htmlContent;
}






const loadTweets = function() {
const url = 'http://localhost:8080/tweets/'
  $.ajax({
  url,
  method: 'GET'

  })
  .done((tweet)=> {

    console.log('getting successful displayed')
    renderTweets(tweet)
  })
  .fail(()=> {

    console.log('could not load')
  })


}


$(document).ready(function(){
  loadTweets()
  $('.form').on('submit', function(event){
  
    event.preventDefault()
    console.log('clicekd on submit');
  
    $.ajax({
      method: "POST",
      url: 'http://localhost:8080/tweets',
      data: $(this).serialize()
  
      })
      .done(()=> {
        console.log('successful posted')
        $('textarea').val('');
        
      })
      .fail(()=> {
        console.log('posting failed')
      })
      .always(loadTweets())
  })
    
  
    
  });
//console.log(renderTweets(dataBase));