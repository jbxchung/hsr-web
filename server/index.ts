const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const config = require('./config');

// limit requests to 100 per second
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 100,
});
app.use(limiter);

// serve static resources for webapp at /dist
app.use('/', express.static(path.join(__dirname, '../dist')));

// pass through all other get request paths for the webapp to handle
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(config.port, () => {
  console.log(`Server started in ${config.env} on port ${config.port}.`);
});
