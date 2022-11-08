const axios = require('axios');

const shareToDiscord = async (clip, webhook, clipper) => {
  try {
    return axios({
      method: 'post',
      url: webhook,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ content: `New clip by **${clipper}**: ${clip}` })
    });
  } catch (err) {
    return new Error(err);
  }
};

exports.shareToDiscord = shareToDiscord;
