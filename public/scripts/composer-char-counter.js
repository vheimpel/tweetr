
$(document).ready(function() {
  $( ".textField" ).on("keyup", function(event) {
    var remaining = 140 - $(".textField").val().length;
    $(".counter").text(remaining);

    if (remaining < 0) {
      $(".counter").addClass("bad"); //Makes the counter go red
    } else {
      $(".counter").removeClass("bad");
    }
  });
});


// jquery is a small library for dealing with browser specific api calls. - built on top of javascript

// Two basic concepts:

// 1. Query the dom for an element on the page

// 2. Can then traverse, manipulate or bind
