# Realtime Twitter Bot

This github repository is the source code for my Medium tutorial on building a twitter bot that replies to tweets with videos.

**Installation Instructions**
Clone this repository to your local machine using `git clone`. To start, run `npm install` to install all specified modules in the package.json file. Then, create a `.env` file and enter your app's authentication keys in this format:
```
API_KEY=XXXXXXXXXXXXXXXX  
SECRET_KEY=XXXXXXXXXXXXXXXX  
ACCESS_TOKEN=XXXXXXXXXXXXXXXX  
ACCESS_TOKEN_SECRET=XXXXXXXXXXXXXXXX
```
If you don't have any authentication keys, you can get them by creating a Twitter account, applying for a Twitter Developer account, and creating a Twitter app. My article provides detailed explanations on how to do this.

**Running the Bot**
You should be able to run the command `node bot.js`  to start the application. Now you or anyone can tweet #FilterMe and the bot will respond with a message or message/video while it is running.
