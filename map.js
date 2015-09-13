
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

/*LostThing.prototype = {
};*/

var testData = [];
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

function visualizeLostThings(lostThings, map){
	lostThings.forEach(function(item){
		var marker = new google.maps.Marker({
			position: item.coord,
			map: map,
			title: item.title,
			animation: google.maps.Animation.DROP,
		});
	});
}

var latitude;
var longitude;
getLocation();
function getLocation() {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showLocation);
	}
}
function showLocation(position) {
	latitude=position.coords.latitude;
	longitude=position.coords.longitude;
	var map = initMap();
	visualizeLostThings(testData, map);
} 

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 12
  });
  
  return map;
}