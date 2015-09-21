

// TODO: Use AngularJS

var map_var;
var latLng;
function initMap(coord) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coord,
    zoom: 12
  });
  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
	
  });
  
  map_var = map;
  return map;
}
var latNew, lngNew;
function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
	icon: image,
	
  });
  latNew = latLng.H;
  lngNew = latLng.L;
  map.panTo(latLng);
  openDialog();
}

function getLostThingContent(lostThing){
	var titleDiv = '<div>' + lostThing.title + '</div>';
	var descriptionDiv = '<div>' + lostThing.description + '</div>';
	var photoImg = '<img src="' + lostThing.photoURL + '"></img>';
	var contactDiv = '<div>' +  lostThing.contact +'</div>';
	return titleDiv + descriptionDiv + photoImg + contactDiv;
};

var image = "icon.gif";
function visualizeLostThings(lostThings, map){
	lostThings.forEach(function(item){
		
		var marker = new google.maps.Marker({
			position: item.coord,
			map: map,
			icon: image,
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
	currentPosition = position;
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
    
	$( "#writeMessage" ).click(function() {openDialog()});
	
	function openDialog() {
	  
		$( "#messageDialog" ).dialog({
			dialogClass: 'main-dialog-class',
			autoOpen: false,
			height: 500,
			width: 400,
			modal: true,
			buttons: {
				"Save": function() {
					var lostThing = new LostThing();
					lostThing.title = $('#title').val();
					lostThing.description = $('#description').val();
					lostThing.photoURL = $('#photoURL').val();
					lostThing.concat = $('#contact').val();
					//lostThing.coord = {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude};
					lostThing.coord = {lat: latNew, lng: lngNew};
					
					
					$( this ).dialog( "close" );
					$.ajax({
						url: 'http://localhost:8080/add', 
						type: 'POST', 
						data: JSON.stringify(lostThing), 
						contentType: "application/json; charset=utf-8",
						success: function(realData){
							visualizeLostThings(realData, map_var);		
						}
					})

				},
				"Cancel": function() {
					$( this ).dialog( "close" );
				}
			},
						
		});
		$( "#messageDialog" ).dialog( "open");
	}
	
		 
			

