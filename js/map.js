
var map, map_var, latLng, myLocation, mapListener, latNew, lngNew, currentPosition;
var curMarker;			
var image = "images/icon.png";
var getDataCallCount = 0;
var getDataCallCountThreshold = 3;


//get user's location
$(function(){
	if (navigator.geolocation){
	   navigator.geolocation.getCurrentPosition(showLocation);
	}
});

//show map
function showLocation(position) {
	currentPosition = position;
	var map = initMap({lat: position.coords.latitude, lng: position.coords.longitude});
	
	function getDataCallback(data) {
	//if we didn't connected to db , we are trying one more time(up to 3 times)
	    if (data === 'Wait') {
	        if (getDataCallCount < getDataCallCountThreshold) {
	            setTimeout(callGetData, 1000);
	        } else {
	            alert("Server can't connect to database, please reload your page and try again");
	        }
	    } else {
	// if we have connection to db  - vizualize data
	        getDataCallCount = 0;
	        visualizeLostThings(data, map);
	    }
	}
//retrieve data from db
	function callGetData() {
	    getDataCallCount++;
	    $.ajax({
	        url: window.location.origin + '/getdata',
	        success: getDataCallback,
	    });
	}

	callGetData();
}

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

//data vizualizing on the map
function visualizeLostThings(lostThings, map){
	if(lostThings) {
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
}


function setMark() {
	
    var listener1 =  map.addListener('click', function(e) {	 
		 latLng = e.latLng;
		 latNew = latLng.lat();
	     lngNew = latLng.lng();
	     openDialog();
		 google.maps.event.removeListener(listener1);
	});		
}  
	
	//Lost thing constructor function
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

	
	
