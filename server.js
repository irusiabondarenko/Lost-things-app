var express = require('express');
var app = express();

app.use(express.static(__dirname));

var testData = [];

app.get('/', function (req, res) {
  res.sendFile('map.html', {root: __dirname});
});

app.get('/getdata', function(req, res){
	res.send(testData);
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