
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clears the body
//create a div to put all your tweets into 
  //$tweets is an array of divs
  function generateTweets(){
    const $tweets = streams.home.map((tweet) => {
      //added an id of tweet instead of div by itself
      console.log(tweet, "WOAH NA")
      const $tweet = $('<div class=tweet></div>');
      //need to add timeStamps to  the text
      const $user = $(`<div id=user></div>`);
      const $message = $(`<p></p>`)
      $user.append(tweet.user);
      //$message.append(tweet.message);
      //$body.append($user);
      //$body.append($message);
      const text = `@${tweet.user}: ${tweet.message} ${tweet.created_at}`;
      //make each user clickable
      console.log($user, "USER");
      //create a click function for user
      $user.on("click", function(){
        console.log("USER CLICKED")
      })
      //put text in it's own div then add the .text function to that div instead of $tweet
      $tweet.text(text);
      return $tweet;
    });
    return $tweets
  };
  //all of the tweets
  const $tweetsDiv = $(`<div id=tweets></div>`);
  console.log($tweetsDiv, "DIVSS");
  $body.append($tweetsDiv);
  $tweetsDiv.append(generateTweets());
  //button
  const $newTweets = $(`<button>New Tweets</button>`)
  $body.prepend($newTweets);
  //now, when button is clicked, it should show new tweets
  $newTweets.on("click", function(){
    console.log("New Tweet Button Clicked");
    //instead of body, let's reference the new div we'll create for tweets
    $($tweetsDiv).html('');
    //want it to generate new tweets each time the button is clicked instead of generating once
    $($tweetsDiv).append(generateTweets())
  })
  //create a button that allows the user to tweet
  // const $createTweet = $(`<button>Create Tweet</button`)
  // $body.append($createTweet);
});
