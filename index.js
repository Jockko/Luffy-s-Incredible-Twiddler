
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clears the body
//create a div to put all your tweets into
  //$tweets is an array of divs
  function generateTweets(array){
    const $tweets = array.map((tweet) => {
      //added an id of tweet instead of div by itself
      console.log(tweet.created_at, "CHECK")
      const $tweet = $('<div class=tweet></div>');
      const $user = $(`<div id=user>@${tweet.user}</div>`);
      const $message = $(`<p></p>`);
      $tweet.append($user);
      $tweet.append($message);
      $tweetsDiv.append($tweet);

      //$user.append(tweet.user);
      //$message.append(tweet.message);
      //$body.append($user);
      //$body.append($message);
      const text = `${tweet.message} ${moment().startOf(tweet.created_at).fromNow()}`;
      //make each user clickable
      console.log($user, "USER");
      //create a click function for user
      $user.on("click", function(){
        console.log("USER CLICKED");
        $tweetsDiv.html('');
        //acccess streams.user 
        //streams.user[tweet.user]
        generateTweets(streams.users[tweet.user]);
      })
      //put text in it's own div then add the .text function to that div instead of $tweet
      $message.text(text);
      return $tweet;
    });
    return $tweets
  };
  //all of the tweets
  const $tweetsDiv = $(`<div id=tweets></div>`);
  //console.log($tweetsDiv, "DIVSS");
  $body.append($tweetsDiv);
  $tweetsDiv.append(generateTweets(streams.home));
  //button
  const $newTweets = $(`<button>New Tweets</button>`)
  $body.prepend($newTweets);
  //now, when button is clicked, it should show new tweets
  $newTweets.on("click", function(){
    console.log("New Tweet Button Clicked");
    //instead of body, let's reference the new div we'll create for tweets
    $($tweetsDiv).html('');
    //want it to generate new tweets each time the button is clicked instead of generating once
    $($tweetsDiv).append(generateTweets(streams.home))
  })
  //create a button that allows the user to tweet
  const $makeTweetButton = $(`<button>Add Tweet</button>`);
  //create a form that allows the user to text
  const $form = $("<form></form>");
  $form.append('<input type="text" value="Create Tweet">');
  $body.prepend($form);
  $body.prepend($makeTweetButton);
  /*now we need to create a function that when the user inputs into the form,
    once the user clicks add Tweet button, the content within the form is added to the tweets
*/  

});