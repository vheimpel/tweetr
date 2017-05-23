function renderTweets(tweets) {
  var $container = $('#tweet-container');
  var overallHtml = "";
  tweets.forEach((tweet) => {
    let html = createTweetElement(tweet);
    overallHtml += html;
  });
$container.html(overallHtml);
}

function createTweetElement(tweet) {
  let dateFromDB = new Date(tweet.created_at).toString().slice(0, 15);
  let html = `
      <article class="tweet-article clearfix">
        <header class="tweet-header clearfix">
          <img class="tweet-avatar" src="${tweet.user.avatars.small}"></img>
          <span class="tweet-handle">${tweet.user.handle}</span>
          <span class="tweet-title">${tweet.user.name}</span>
        </header>
        <div class="tweet-body clearfix">${tweet.content.text}</div>
        <footer class="tweet-footer clearfix">
          <div class="tweet-date">${dateFromDB}</div>
          <div class="tweet-icons">
            <i class="fa fa-flag"></i>&nbsp;
            <i class="fa fa-retweet"></i>&nbsp;
            <i class="fa fa-heart"></i>
          </div>
          </footer>
      </article>
      `;
  return html;
}

function loadTweets() {
  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetsJson) {
        renderTweets(tweetsJson);
      }
    });
}
loadTweets();


$(document).ready(function() {

  $("#compose-button").click(function(){
      if (!$("#tweet-form").is(':visible')) {
        $("#tweet-form").slideToggle(500);
        $("#tweet-input").focus();
      } else {
        $("#tweet-form").slideToggle(500);
      }
  });

  $("#tweet-form").on("submit", (event) => {
    event.preventDefault();
    $("#tweet-error").text("");
    const newTweet = $('#tweet-input').val();

    if (newTweet == "") {
      $("#tweet-error").text("Please enter a tweet!");
      $(".counter").addClass("gone"); //Removes the counter
      $("#tweet-error").removeClass("gone");
      return
      } else if (newTweet.length > 140) {
        $("#tweet-error").text("Tweet too long!");
        $(".counter").addClass("gone"); //Removes the counter
        $("#tweet-error").removeClass("gone");
        return
      }

      $(".counter").removeClass("gone"); //Replaces the counter
      $.ajax({
        url: '/tweets/new',
        method: 'POST',
        data: {
        text: newTweet
        }

        }).done((tweet) => {
        //process added tweet

        const html = createTweetElement(tweet);
        $('#tweet-container').prepend(html);
        $('#tweet-input').val('').focus(); //Clears the form after submitting
        resetCounter();
        }).fail((error) => {
          $("#tweet-error").text(error);
          console.error(error);
        });

  });
});










