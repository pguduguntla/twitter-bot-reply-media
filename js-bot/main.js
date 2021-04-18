const { auth, postReplyWithMedia, postReply } = require('./config.js');

const client = auth();

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
client.stream('statuses/filter', { track: '#RemoveNoise' }, function (stream) {

  // ... when we get tweet data...
  stream.on('data', function (tweet) {
    console.log(tweet);
    if (tweet.media_url) {
      //call the post function to tweet reply video
      console.log("has media")
      postReplyWithMedia(client, "../video2.mp4", tweet);
      
    } else {
      console.log("no media")
      const message = "Oops, looks like you didn't provide a media file!";
      postReply(client, message, tweet);
    }

    // ... when we get an error...
    stream.on('error', function (error) {
      //print out the error
      console.log(error);
    });
  });
});