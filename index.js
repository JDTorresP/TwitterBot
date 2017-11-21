var Twit = require('twit');
var config = require('./consumer.js');

var T = new Twit(config);

//FIRST PART
// Interval for tweet random number
// setInterval(tweetIt,1000*20 )
function tweetIt(text){
    T.post('statuses/update', { status: text }, function(err, data, response) {
    //console.log(data)
    console.log("Twitteo!!")
    })
}

tweetIt("Hola John @Uniandes #WebDev #BotTalk");

//REPLY SOMETHING
var streamT = T.stream('user');
streamT.on('tweet',tweetEvent);
function tweetEvent(event){

  //SAVE THE DATA
  // const fs = require('fs');
  // const content = JSON.stringify(event);
  // fs.writeFile("/home/joan/Documents/Universidad/Web/Class/TwitterBot/TwitterBot/tweet.json", content, 'utf8', function (err) {
  //     if (err) {
  //         return console.log(err);
  //     }

  //     console.log("The file was saved!");
  // }); 

  // REPLY THE TWEET
    var replyto= event.in_reply_to_screen_name;
    var text = event.text;
    var from = event.user.screen_name;

    if(replyto=='jdtwitbot'){
      var newTweet = '@'+ from + ' thank you for tweeting me!'
  }
    tweetIt(newTweet);
}

  //REPLY IMAGE
// var stream = T.stream('user');
// stream.on('tweet', imageTweet);

// function imageTweet(event){
//   var searchtag= event.entities.hashtags[0];
//   var toSearch = searchtag.text;



// }

// //MANAGE TWITTER FOLLOW
var stream = T.stream('user');

stream.on('follow', followed);

function followed(event){
 var name = event.source.name;
 var screenName = event.source.screen_name;
 tweetIt('Hi @'+screenName+' Thank you for following me!');
}

// 
// filter the public stream by the latitude/longitude bounded box of San Francisco 
// 
// var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
// var stream2 = T.stream('statuses/filter', { locations: sanFrancisco })
// stream2.on('tweet', function (tweet) {
// console.log ("san Francisco tweet: ");
//   console.log(tweet)
// })
