const { auth, postReplyWithMedia, postReply  } = require('./config.js');

const client = auth();

client.stream('statuses/filter', { track: '#FilterMe' }, function (stream) {
  console.log("Searching for tweets...");

  // when a tweet is found
  stream.on('data', function (tweet) {
    console.log("Found one!");
    console.log("Recieved tweet reading...", tweet.text);

    // check if tweet contains some media
    if (tweet.media_url) {
      console.log("Replying to tweet with video.");
      postReplyWithMedia(client, "./sample-media/video.mp4", tweet);

    } else {
      console.log("Tweet didn't provide media. Replying with message.");
      const message = "Oops, looks like you didn't provide a media file!";
      postReply(client, message, tweet);
    }

    stream.on('error', function (error) {
      console.log(error);
    });
  });
});