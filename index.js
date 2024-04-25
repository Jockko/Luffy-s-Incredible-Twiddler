
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clears the body
//create a div to put all your tweets into
  //$tweets is an array of divs
  function generateTweets(array){
    const $tweets = array.map((tweet) => {
      //added an id of tweet instead of div by itself
      //console.log(tweet.created_at, "CHECK")
      const $tweet = $('<div class=tweet></div>');
      const $user = $(`<div id=user>@${tweet.user}</div>`);
      const $message = $(`<p></p>`);
      $tweet.append($user);
      $tweet.append($message);
      $tweetsDiv.prepend($tweet);

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
  generateTweets(streams.home);
  //button
  const $newTweets = $(`<button>New Tweets</button>`)
  $body.prepend($newTweets);
  //now, when button is clicked, it should show new tweets
  $newTweets.on("click", function(){
    console.log("New Tweet Button Clicked");
    //instead of body, let's reference the new div we'll create for tweets
    $($tweetsDiv).html('');
    //want it to generate new tweets each time the button is clicked instead of generating once
    generateTweets(streams.home);
    
  })
  //create a button that allows the user to tweet
  const $makeTweetButton = $(`<button>Add Tweet</button>`);
  //create a form that allows the user to text
  const $form = $("<form></form>");
  $form.append('<input type="text" value="Create Tweet">');
  $body.prepend($form);
  $form.append($makeTweetButton);
  /*now we need to create a click function for makeTweetButton. When the user inputs into the form,
    once the user clicks add Tweet button, the content within the form is added to the tweets
*/  
$form.on("submit", function(event){
 console.log("HI");
 event.preventDefault();
 console.log($("input").val(), "VALUEE");
 window.visitor = "User";
 streams.users[window.visitor] = [];
 console.log(streams.users[window.visitor], "VISITORR");
 writeTweet($("input").val());
 generateTweets(streams.home);
})
$body.css('background-image', 'url(https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/04/luffy-cool-one-piece.jpg)');
$body.css("background-repeat", "no-repeat");
$body.css("background-attachment", "fixed");
$body.css("background-size", "cover");
let $header = $(`<h1>Twiddler</h1>`);
$header.css("color", "red");
//$header.css("text-align", "center")
$body.prepend($header)
//$body.css(`background-size: 100vw 100vh`);

});