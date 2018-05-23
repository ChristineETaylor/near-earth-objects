var express = require('express');
var cors = require('cors');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

app.use(cors());

let url = 'https://api.nasa.gov/neo/rest/v1/feed/today?api_key=v5RFC0BvhWX1dRLupQt3ykxykp0OXc5ULq4OFozA';



function apiConnect() {
  console.log('in apiConnect');
  app.get(url, function (req, res) {
    console.log(req, res);
    request('/', function (error, response, body) {
      console.log(request);
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        // do more stuff
        console.log('API CALL SUCCESSFUL');
        res.send(info);
      }
    })
  });
}

app.listen(3000, () => {
  console.log("The server is now running on port 3000.");
  apiConnect();
});
