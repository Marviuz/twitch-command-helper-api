const express = require('express');
const router = express.Router();
const { createClip } = require('../utils/clip');
const { shareToDiscord } = require('../utils/discord');
const { getCurrentlySubbed, getBitsLeaderboard } = require('../utils/twitch');
const shareToTwitter = require('../utils/twitter');

// !so !shoutout
router.get('/shoutout/:name/:game', (req, res) => {
  const { name, game } = req.params;

  const randomShoutout = ($name) => {
    const so = [
      `HOW IS YOU MADAFA- I mean ${$name}? HungryPaimon`,
      `How is you ${$name}? HungryPaimon`,
      `${$name} is here!!! Welcome!!!`
    ];

    return so[Math.floor(Math.random() * so.length)];
  };

  if (game.trim() === '<no game>') res.send(randomShoutout(name));
  else res.send(`Checkout ${name} at https://twitch.tv/${name} Last seen playing ${game} on stream! HungryPaimon`);
});

// !clip
router.get('/clip/:code/:channel/:dcServer/:dcChannel/:clipper', async (req, res) => {
  const { code, channel, dcServer, dcChannel, clipper } = req.params;
  const webhook = `https://discord.com/api/webhooks/${dcServer}/${dcChannel}`;

  try {
    const clipURL = await createClip(code, channel);

    if (clipURL.match(/^http/gm)) { // If it's a link, share it to discord
      const dscShare = await shareToDiscord(clipURL, webhook, clipper);
      const twtShare = await shareToTwitter(`Clipped by ${clipper}\nThis message is bot generated!\n${clipURL}`);
      if (dscShare) res.send(`@${clipper} ${clipURL} also shared at Discord & Twitter! ${twtShare}`);
      else res.send(`@${clipper} ${clipURL} also Twitter! ${twtShare}, unfortunately share to Discord failed!`);
    } else { // If not, only share the message
      res.send(`${clipURL} Try it again!`);
    }
  } catch (err) {
    console.error('router.get FAILED');
    res.send(`Failed to share to discord server D:`);
    throw new Error(err);
  }
});

// View all currently subbed users (max 100)
router.get('/subs/:id', async (req, res) => {
  const subs = await getCurrentlySubbed(req.params.id);

  res.send(subs);
});

// View cheerer leaderboard users (max 100)
router.get('/cheers', async (req, res) => {
  const cheerers = await getBitsLeaderboard();

  res.send(cheerers);
});

module.exports = router;
