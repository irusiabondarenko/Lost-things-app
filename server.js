var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

var testData = [];
//var realData = [];

app.get('/', function (req, res) {
  res.sendFile('map.html', {root: __dirname});
});

app.get('/getdata', function(req, res){
	res.send(testData);
});

app.post('/add', function(req, res){
	var realData = [];
	testData.push(req.body);
	realData.push(req.body);
    res.send(realData);
});

app.post('/delete', function(req, res){
	var roundLng = Math.round(req.body.L*1000000)/1000000;
	var roundLat = Math.round(req.body.H*1000000)/1000000;
	
	for(var i = 0; i<testData.length; i++) {
		var roundCurrentLat = Math.round(testData[i].coord.lat*1000000)/1000000;
		var roundCurrentLng = Math.round(testData[i].coord.lng*1000000)/1000000;
		if ((roundLat==roundCurrentLat)&&(roundLng==roundCurrentLng)) {
		 testData.splice(i, 1);
		}
	
    //res.send(testData);
	}
	console.log(testData);
//}
});

var server = app.listen(8080, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


var LostThing = function() {
	this.coord = {
		lng:'',
		lat:''
	};
	this.title = '';
	this.description = '';
	this.contact = '';
	this.photoURL = '';
}

var lostThing = new LostThing();
lostThing.coord.lat = 47.593367;
lostThing.coord.lng = -122.125279;
lostThing.title = 'Ball';
lostThing.description = 'It is smiling,';
lostThing.photoURL = 'http://www.phoenixparkbook.com/funnyball.gif';
lostThing.contact = 'a@gmail.com';
testData.push(lostThing);

lostThing = new LostThing();
lostThing.coord.lat = 47.608762;
lostThing.coord.lng = -122.097298;
lostThing.title = 'Dog';
lostThing.description = 'I was swimming on kayak with my dog. And it dissapeared...';
lostThing.photoURL = 'http://www.splotchy.com/images/blog/puppy.jpg';
lostThing.contact = 'b@gmail.com';
testData.push(lostThing);
