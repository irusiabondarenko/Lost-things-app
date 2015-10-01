
var map, map_var, latLng;
var myLocation;
var mapListener;
var latLng;
var latNew, lngNew;
function initMap(coord) {
	var style = [
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "color": "#40a5ff" },
      { "hue": "#00a1ff" }
    ]
  },{
  }
]
 var myOptions = {
        zoom: 12,
        center: coord,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: style
    };
  map = new google.maps.Map(document.getElementById("map"),
        myOptions);
 
  map_var = map;
  return map;
}

function setMark() {
	
    var listener1 =  map.addListener('click', function(e) {
		 openDialog();
		 latLng = e.latLng;
		 latNew = latLng.H;
	  lngNew = latLng.L;
		 google.maps.event.removeListener(listener1);
	});
	
	
		
}  
	

function visualizeLostThings(lostThings, map){
	lostThings.forEach(function(item){
		var marker = new google.maps.Marker({
			position: item.coord,
			map: map,
			icon: image,
			title: item.title,
			animation: google.maps.Animation.DROP,
			markerId: item.unique_id 
			
		});
		var infowindow = new google.maps.InfoWindow({
			content: getLostThingContent(item),
			mixWidth: 350,
		
		});
		
		marker.addListener('click', function(){
			infowindow.open(map, marker);
			curMarker = this;
		});
		
		google.maps.event.addListener(infowindow, 'domready', function() {	
			var iwOuter = $('.gm-style-iw');
			var iwBackground = iwOuter.prev();

			iwBackground.children(':nth-child(2)').css({'display' : 'none'});
			iwBackground.children(':nth-child(4)').css({'display' : 'none'});
			iwOuter.parent().parent().css({left: '115px'});
			iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
			iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
			iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
			var iwCloseBtn = iwOuter.next();
			iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});		
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
	this.unique_id = guid();
}
	
$(".nav-anchor").hover(function(){
    $(this).css("color", "white");
    }, function(){
    $(this).css("color", "");
});

	
	