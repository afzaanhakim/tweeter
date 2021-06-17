
//function to secure from cross-site scripting vulnerabilities
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//rendering tweets generated
const renderTweets = function (data) {
  
  $("#tweet-container").empty();
  for (let tweet of data) {
    let renVal = createTweetElement(tweet);
    $("#tweet-container").append(renVal);
  }
};
// creating HTML for dynamic tweets from the server
const createTweetElement = function (data) {
  let htmlContent = `<article class = "tweet">
<header class = "user-header">
<header class = "friend-profile"> <img class ="avatar" src="${escape(
    data.user.avatars
  )}"> ${escape(data.user.name)} </header>
<header class = "friend-handle"> ${escape(data.user.handle)}</header>
</header>
<section class = "tweet-text"> ${escape(data.content.text)}</section>
<footer class = "actions"><div class = "time"> ${timeago.format(
    data.created_at
  )} </div><div class = icons><i name = "retweet" class="fas fa-retweet"></i>
<i name = "flag" class="fas fa-flag"></i>
<i name = "heart" class="fas fa-heart"></i></div></footer>
</article>`;

  return htmlContent;
};

const hideErrorBox = function(){
  $(".new-tweet .error").hide();
}
const tweetForm = $(".new-tweet .form")
// fetching tweets and rendering to the timeline
const loadTweets = function () {
  hideErrorBox()
  const url = "http://localhost:8080/tweets";
  $.ajax({
    url,
    method: "GET",
  })
    .done((tweet) => {
      
      renderTweets(tweet);
    })
    .fail(() => { console.log(error)
    });
};

// posting tweets and calling load tweets to render tweets to the timeline // conditions for submitting tweets

$(document).ready(function () {
  
  loadTweets();
  $(".new-tweet .form").on("submit", function (event) {
    event.preventDefault();

    if ($(".new-tweet textarea").val().trim().length > 140) {
      $(".new-tweet .error").text("😕😕 Shorten your tweet to below 140 characters plz 😕😕");
      $(".new-tweet .error").slideDown();
    } else if ($(".new-tweet textarea").val().trim() === "") {
      $(".new-tweet .error").text("❗Hey, I don't think you've typed anything in here? ❗");
      $(".new-tweet .error").slideDown();
    } else {
      hideErrorBox()
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets",
        data: $(this).serialize(),
      })
        .done(() => {
          $("textarea").val("");
          $(".counter").text("140");
        })
        .fail(() => {
          console.log("posting failed");
        })
        .always(()=> {loadTweets()});
    }
  });
});

