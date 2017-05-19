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
  let html = `
      <article class="tweet-article">
      <header class="tweet-header">${tweet.user.name}</header>
      <span class="tweet-handle">${tweet.user.handle}</span>
      <span class="tweet-body">${tweet.content.text}</span>
      <footer class="tweet-footer">${tweet.created_at}</h4></footer>
      </article>
      `;
  return html;
}

function loadTweets() {
  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetsJson) {
        console.log('Success: ', tweetsJson);
        renderTweets(tweetsJson)
      }
    })
}
loadTweets()


$(document).ready(function() {

  $("#tweet-form").on("submit", (event) => {
    event.preventDefault();
    $("#tweet-error").text("")
    const newTweetName = $('#tweet-input').val();

    if (newTweetName == "") {
      $("#tweet-error").text("Please enter a tweet!")
      $(".counter").addClass("gone"); //Removes the counter
      $("#tweet-error").removeClass("gone")
      return
      } else if (newTweetName.length > 140) {
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
        text: newTweetName
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










