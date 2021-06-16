const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function (data) {
  $("#tweet-container").empty();
  for (let tweet of data) {
    let renVal = createTweetElement(tweet);
    $("#tweet-container").append(renVal);
  }
};

const createTweetElement = function (data) {
  let htmlContent = `<article class = "tweet">
<header class = "user-header">
<header class = "friend-profile"> <img class ="avatar" src="${
    escape(data.user.avatars)
  }"> ${escape(data.user.name)} </header>
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

const loadTweets = function () {
  const url = "http://localhost:8080/tweets";
  $.ajax({
    url,
    method: "GET",
  })
    .done((tweet) => {
      console.log("getting successful displayed");
      renderTweets(tweet);
    })
    .fail(() => {
      console.log("could not load");
    });
};


//
$(document).ready(function () {
  loadTweets();
  $(".new-tweet .form").on("submit", function (event) {
    event.preventDefault();
    console.log("clicekd on submit");

    if ($(".new-tweet textarea").val().length > 140) {
      alert("Too long");
    } else if ($(".new-tweet textarea").val() === "") {
      alert("You have not typed anything in here yet");
    } else {
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets",
        data: $(this).serialize(),
      })
        .done(() => {
          console.log("successful posted");
          $("textarea").val("");
          $(".counter").text("140");
        })
        .fail(() => {
          console.log("posting failed");
        })
        .always(loadTweets());
    }
  });
});
//console.log(renderTweets(dataBase));
