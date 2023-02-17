/**
 * FreeCodeCamp Timestamp microservice
 * Receive a string parameter and gives a JSON with unix and natural date format
 * @author Lior Chamla
 */
var http = require('http');
var path = require('path');
var express = require('express');
var strftime = require('strftime');
var router = express();
var server = http.createServer(router);

// static files (html, css ...)
router.use(express.static(path.resolve(__dirname, 'client')));

// route on GET with a parameter we call :date
router.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;
  const dateStringRegex = /^[0-9]+$/;
  const numbersOnly = dateStringRegex.test(dateString);

  if (!numbersOnly) {
    const unixTimestamp = Date.parse(dateString);
    const utcDate = new Date(unixTimestamp).toUTCString();
    console.log({ unix: unixTimestamp, utc: utcDate });
    unixTimestamp
      ? res.json({ unix: unixTimestamp, utc: utcDate })
      : res.json({ error: 'Invalid Date' });
  } else {
    const unixTimestamp = parseInt(dateString);
    const actualDate = new Date(unixTimestamp);
    const utcDate = actualDate.toUTCString();
    console.log({ unix: unixTimestamp, utc: utcDate });
    res.json({ unix: unixTimestamp, utc: utcDate });
  }

  router.get('/api', (req, res) => {
    const currentDate = new Date().toUTCString();
    const currentUnix = Date.parse(currentDate);
    res.json({ unix: currentUnix, utc: currentDate });
  });
});

// listening to port and processing
server.listen(
  process.env.PORT || 3000,
  process.env.IP || '0.0.0.0',
  function () {
    var addr = server.address();
    console.log(
      'Timestamp microservice listening at',
      addr.address + ':' + addr.port
    );
  }
);
