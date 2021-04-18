var TwitterPackage = require('twitter');
require('dotenv').config();
const fs = require('fs');
const Promise = require('bluebird')


// auth methods
const auth = () => {
    let secret = {
        consumer_key: process.env.API_KEY,
        consumer_secret: process.env.SECRET_KEY,
        access_token_key: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    }

    var client = new TwitterPackage(secret);
    return client;
}

// media upload methods

const initializeMediaUpload = (client, pathToFile) => {
    const mediaType = "video/mp4";
    const mediaSize = fs.statSync(pathToFile).size
    return new Promise(function (resolve, reject) {
        client.post("media/upload", {
            command: "INIT",
            total_bytes: mediaSize,
            media_type: mediaType
        }, function (error, data, response) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(data.media_id_string)
            }
        })
    })
}

const appendFileChunk = (client, mediaId, pathToFile) => {
    const mediaData = fs.readFileSync(pathToFile)
    return new Promise(function (resolve, reject) {
        client.post("media/upload", {
            command: "APPEND",
            media_id: mediaId,
            media: mediaData,
            segment_index: 0
        }, function (error, data, response) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(mediaId)
            }
        })
    })
}

const finalizeUpload = (client, mediaId) => {
    return new Promise(function (resolve, reject) {
        client.post("media/upload", {
            command: "FINALIZE",
            media_id: mediaId
        }, function (error, data, response) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(mediaId)
            }
        })
    })
}

const postReplyWithMedia = (client, mediaFilePath, replyTweet) => {

    initializeMediaUpload(client, mediaFilePath)
        .then((mediaId) => appendFileChunk(client, mediaId, mediaFilePath))
        .then((mediaId) => finalizeUpload(client, mediaId))
        .then((mediaId) => {
            let statusObj = {
                status: "Hi @" + replyTweet.user.screen_name + ", Whatever your reply is",
                in_reply_to_status_id: replyTweet.id_str,
                media_ids: mediaId
            }
            client.post('statuses/update', statusObj, function (error, tweetReply, response) {

                //if we get an error print it out
                if (error) {
                    console.log(error);
                }

                //print the text of the tweet we sent out
                console.log(tweetReply.text);
            });
        })
}

const postReply = (client, message, replyTweet) => {
    let statusObj = {
        status: "Hi @" + replyTweet.user.screen_name + ", " + message,
        in_reply_to_status_id: replyTweet.id_str,
    }

    client.post('statuses/update', statusObj, function (error, tweetReply, response) {

        //if we get an error print it out
        if (error) {
            console.log(error);
        }

        //print the text of the tweet we sent out
        console.log(tweetReply.text);
    });
}

module.exports = { auth, postReplyWithMedia, postReply };
