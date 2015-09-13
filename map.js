
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

// TODO: Use AngularJS
function getLostThingContent(lostThing){
	var titleDiv = '<div>' + lostThing.title + '</div>';
	var descriptionDiv = '<div>' + lostThing.description + '</div>';
	var photoImg = '<img src="' + lostThing.photoURL + '"></img>';
	var contactDiv = '<div>' +  lostThing.contact +'</div>';
	return titleDiv + descriptionDiv + photoImg + contactDiv;
};

function visualizeLostThings(lostThings, map){
	lostThings.forEach(function(item){
		
		var marker = new google.maps.Marker({
			position: item.coord,
			map: map,
			title: item.title,
			animation: google.maps.Animation.DROP,
		});
		var infowindow = new google.maps.InfoWindow({
			content: getLostThingContent(item)
		});
		marker.addListener('click', function(){
			infowindow.open(map, marker);
		});
		
	});
}

function getLocation() {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showLocation);
	}
}
function showLocation(position) {
	var map = initMap({lat: position.coords.latitude, lng: position.coords.longitude});
	visualizeLostThings(testData, map);
} 

function initMap(coord) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coord,
    zoom: 12
  });
  
  return map;
}

getLocation();