// POST example
// $.ajax({url: 'http://localhost:8080/add', type: 'POST', data: JSON.stringify({a: 'str', b: 123}), contentType: "application/json; charset=utf-8"})

// TODO: Use AngularJS

function getLostThingContent(lostThing){
	var titleDiv = '<div>' + lostThing.title + '</div>';
	var descriptionDiv = '<div>' + lostThing.description + '</div>';
	var photoImg = '<img src="' + lostThing.photoURL + '"></img>';
	var contactDiv = '<div>' +  lostThing.contact +'</div>';
	return titleDiv + descriptionDiv + photoImg + contactDiv;
};
var map_var;
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
var currentPosition;
function showLocation(position) {
	var map = initMap({lat: position.coords.latitude, lng: position.coords.longitude});
	// Use real host instead of localhost 
	$.ajax({
		url: 'http://localhost:8080/getdata',
		success: function(data) {
			var testData = data;
			visualizeLostThings(testData, map);
		}
	});
} 

function initMap(coord) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coord,
    zoom: 12
  });
  map_var = map;
  return map;
}

$(function(){
	getLocation();	
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