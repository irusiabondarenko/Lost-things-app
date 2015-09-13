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
	initMap();
} 

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 15
  });
}