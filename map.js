// POST example
// $.ajax({url: 'http://localhost:8080/add', type: 'POST', data: JSON.stringify({a: 'str', b: 123}), contentType: "application/json; charset=utf-8"})

// TODO: Use AngularJS
<<<<<<< HEAD


=======
>>>>>>> 40c5bde82646bb33c1dbb1ef36fdece80e2a0f15
function getLostThingContent(lostThing){
	var titleDiv = '<div>' + lostThing.title + '</div>';
	var descriptionDiv = '<div>' + lostThing.description + '</div>';
	var photoImg = '<img src="' + lostThing.photoURL + '"></img>';
	var contactDiv = '<div>' +  lostThing.contact +'</div>';
	return titleDiv + descriptionDiv + photoImg + contactDiv;
};
<<<<<<< HEAD
var map_var;
=======

>>>>>>> 40c5bde82646bb33c1dbb1ef36fdece80e2a0f15
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

<<<<<<< HEAD

=======
>>>>>>> 40c5bde82646bb33c1dbb1ef36fdece80e2a0f15
function getLocation() {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showLocation);
	}
}
<<<<<<< HEAD
var currentPosition;
function showLocation(position) {
	currentPosition = position;
=======
function showLocation(position) {
>>>>>>> 40c5bde82646bb33c1dbb1ef36fdece80e2a0f15
	var map = initMap({lat: position.coords.latitude, lng: position.coords.longitude});
	// Use real host instead of localhost 
	$.ajax({
		url: 'http://localhost:8080/getdata',
		success: function(data) {
			var testData = data;
			visualizeLostThings(testData, map);
		}
	});
<<<<<<< HEAD
	
=======
>>>>>>> 40c5bde82646bb33c1dbb1ef36fdece80e2a0f15
} 

function initMap(coord) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coord,
    zoom: 12
  });
<<<<<<< HEAD
  map_var = map;
=======
  
>>>>>>> 40c5bde82646bb33c1dbb1ef36fdece80e2a0f15
  return map;
}

$(function(){
	getLocation();	
});
<<<<<<< HEAD

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


function message(){
	var lostThing = new LostThing();
    lostThing.coord = {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude};
	lostThing.title = prompt("Enter title");
	//testData.push(lostThing);
    $.ajax({
		url: 'http://localhost:8080/add', 
		type: 'POST', 
		data: JSON.stringify(lostThing), 
		contentType: "application/json; charset=utf-8",
		success: function(testData){
			visualizeLostThings(testData, map_var);		
		}
	})

}

=======
>>>>>>> 40c5bde82646bb33c1dbb1ef36fdece80e2a0f15
