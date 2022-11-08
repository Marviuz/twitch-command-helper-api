const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const shareToTwitter = async (msg) => {
  const tweeted = await twitterClient.v1.tweet(msg);
  return `https://twitter.com/Marviuz/status/${tweeted.id_str}`;
};

module.exports = shareToTwitter;
