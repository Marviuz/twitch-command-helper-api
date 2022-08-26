const express = require('express');
const cors = require('cors');
const tof = require('./routes/tof');
const twitch = require('./routes/twitch');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

// General Twitch commands
app.use('/twitch', twitch);

// Tower of Fantasy Commands for twitch
app.use('/tof', tof);

// Wrong command
app.get('*', (req, res) => {
  res.send('Something went wrong! You sure you typed the command correctly? D:');
});

app.listen(PORT, () => console.log(`> Ready on port ${PORT}`));
