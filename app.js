const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/js'));
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/
// Root Route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// App listens on Port 8000 for requests
app.listen(8000, function (err) {
  if (err) console.log("Error starting server.  Msg: " + err)
  console.log('Node.js and Express app listening on port 8000!');
});