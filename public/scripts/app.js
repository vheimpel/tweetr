/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
// var data = [
//   {
//     "user": {
//             "name": "Newton",
//             "avatars": {
//                         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//                         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//                         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//                         },
//             "handle": "@SirIsaac"
//             },

//     "content": {
//               "text": "If I have seen further it is by standing on the shoulders of giants"
//                 },
//     "created_at": 1461116232227
//                 },
//               {


//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense, donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

function renderTweets(tweets) {
  var $container = $('#tweet-container');
  var overallHtml = ""
  tweets.forEach((tweet) => {
    let html = createTweetElement(tweet);
    overallHtml += html;
  });
$container.html(overallHtml)
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
        renderTweets(tweetsJson)
      }
    })
}
loadTweets()


$(document).ready(function() {

  $("#compose-button").click(function(){
      $("#tweet-form").slideToggle(500);
      $("#tweet-input").focus();
  });

  $("#tweet-form").on("submit", (event) => {
    event.preventDefault();
    $("#tweet-error").text("")
    const newTweet = $('#tweet-input').val();

    if (newTweet == "") {
      $("#tweet-error").text("Please enter a tweet!")
      $(".counter").addClass("gone"); //Removes the counter
      $("#tweet-error").removeClass("gone")
      return
      } else if (newTweet.length > 140) {
        $("#tweet-error").text("Tweet too long!")
        $(".counter").addClass("gone"); //Removes the counter
        $("#tweet-error").removeClass("gone")
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
        $('.textField').val('').focus(); //Clears the form after submittin
        resetCounter();
        }).fail((error) => {
          $("#tweet-error").text(error)
          console.error(error);
        })

  });
});










