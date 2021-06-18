//function to secure from cross-site scripting vulnerabilities
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//appending the array of tweet objects to the #tweet-container
const renderTweets = function (data) {
  $("#tweet-container").empty();
  for (let tweet of data) {
    let renVal = createTweetElement(tweet);
    $("#tweet-container").append(renVal);
  }
};

//function for hiding the error box
const hideErrorBox = function () {
  $(".new-tweet .error").hide();
};

// creating HTML <article> element containing user tweet, name, avatar and handle
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

// function for fetching tweets from "/tweets" and calling renderTweets with tweet
const loadTweets = function () {
  hideErrorBox(); // calling hideErrorbox inside loadTweets so that errorBox is hidden as soon as tweets loaded
  const url = "http://localhost:8080/tweets";
  $.ajax({
    url,
    method: "GET",
  })
    .done((tweet) => {
      renderTweets(tweet);
    })
    .fail(() => {
      console.log("error");
    });
};

$(document).ready(function () {
  loadTweets();

  //form submission
  $(".new-tweet .form").on("submit", function (event) {
    //avoiding default action of taking the browser to the tweets/ url
    event.preventDefault();
    //character criterias for submission and error HTML element  shown if criterias are not met
    if ($(".new-tweet textarea").val().trim().length > 140) {
      $(".new-tweet .error").text(
        "😕😕 Shorten your tweet to below 140 characters plz 😕😕"
      );
      $(".new-tweet .error").slideDown();
    } else if ($(".new-tweet textarea").val().trim() === "") {
      $(".new-tweet .error").text(
        "❗Hey, I don't think you've typed anything in here? ❗"
      );
      $(".new-tweet .error").slideDown();
    } else {
      //if succesfuly, loading and displaying tweets
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets",
        data: $(this).serialize(),
      })
        .done(() => {
          $("textarea").val(""); //resetting tweet input textarea
          $(".counter").text("140"); //resetting counter to 140
        })
        .fail(() => {
          console.log("posting failed");
        })
        .always(() => {
          loadTweets();
        });
    }
  });
});
