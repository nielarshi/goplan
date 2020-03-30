const express = require('express');
var path=require('path');

const bodyParser = require('body-parser');

var querystring = require('querystring');
var request = require('request');
var btoa = require('btoa');

const server = express();

server.use(
  bodyParser.urlencoded({
    extended: true
  })
)

server.use(bodyParser.json())


server.use(express.static(path.join(__dirname, 'public')));

server.get("/", (req, res) => {
   res.sendFile(__dirname + '/index.html');
});


var CRED = {
	"username" : "c3czxt53ug",
	"password" : "bgbpcmyxrl"
}
var URLs = {
	"base" : "https://c3czxt53ug:bgbpcmyxrl@goplan-4105522326.us-east-1.bonsaisearch.net"
};

server.post("/proxy", (req, res) => {
   console.log(req.body.api, req.body.data);
   var data = req.body.data;

   if (req.body.type == 'GET') {
   		request.get(URLs.base + req.body.api, {
			json: true,
			body: data,
			headers: {
			  'Content-Type': 'application/json',
			  "Authorization": "Basic " + btoa(CRED.username + ":" + CRED.password)
			}
		},
		function(error, response, body) {
			res.send(response.body);
		});
   } else {
   		request.post(URLs.base + req.body.api, {
			json: data,
			headers: {
			  'Content-Type': 'application/json',
			  "Authorization": "Basic " + btoa(CRED.username + ":" + CRED.password)
			}
		},
		function(error, response, body) {
			res.send(response.body);
		});
   }
   

});


const port = 3000;

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
