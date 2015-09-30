
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
	
function getLostThingContent(lostThing){
	return '<div id="iw-container">' +
				'<div class = "iw-title">' + lostThing.title + '</div>' +
					'<div class="iw-content">' +
					'<div class="iw-subTitle">Description</div>' +
					 '<img id = "picture" src="' + lostThing.photoURL + '"></img>'+
					'<p>' + lostThing.description + '</p>'+
					'<div class="iw-subTitle">Contacts</div>' +
					'<p>' +  lostThing.contact + '</p>' +
					'<button id = "deleteButton" onclick="deleteThing()">Delete</button>' +
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';	
};

var curMarker;			
var image = "icon.png";

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function deleteThing() {
	
	$.ajax({
		url: 'http://localhost:8080/delete', 
		type: 'POST', 
		data: JSON.stringify ({unique_id: curMarker.markerId}), 
		contentType: "application/json; charset=utf-8",
		success: 
	     document.location.reload(true)
	
	})
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
	$("#writeMessage").click(function(){ 
	showOptions()
				 
	});
    
	function showOptions() {
		$( "#optionDialog" ).dialog({
			resizable: false,
			dialogClass: 'optionDialog', 
			autoOpen: false,
			height: 50,
			width: 527,
			modal: true,
			buttons: {
				"Set mark on the map": function() {
					myLocation = false;
					setMark();
                    $( this ).dialog( "close" );
				},
				"Use my current location": function() {
					myLocation = true;
					openDialog();
					$( this ).dialog( "close" );
				}
			}
						
		});
		$( "#optionDialog" ).dialog( "open" );
	}
		
	
	function openDialog() {
	  
		$( "#messageDialog" ).dialog({
			dialogClass: 'messageDialogClass', 
			resizable: false,
			autoOpen: false,
			height: 410,
			width: 362,
			modal: true,
			buttons: {
				"Save": function() {
					$( this ).dialog( "close" );
					var lostThing = new LostThing();
					lostThing.title = $('#title').val();
					lostThing.description = $('#description').val();
					lostThing.photoURL = $('#photoURL').val();
					lostThing.contact = $('#contact').val();
				    if (myLocation==true) {
					lostThing.coord = {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude};
					} 
					if (myLocation==false) {
					lostThing.coord = {lat: latNew, lng: lngNew};
					}
					
					
					$.ajax({
						url: 'http://localhost:8080/add', 
						type: 'POST', 
						data: JSON.stringify(lostThing), 
						contentType: "application/json; charset=utf-8",
						success: function(realData){
							visualizeLostThings(realData, map_var);		
						}
					})
                    $('#title').val("");
					$('#description').val("");
					$('#photoURL').val("");
					$('#contact').val("");
				},
				"Cancel": function() {
					$('#title').val("");
					$('#description').val("");
					$('#photoURL').val("");
					$('#contact').val("");
					$( this ).dialog( "close" );
				},
				
			},
						
		});
		$( "#messageDialog" ).dialog( "open");
		
	
	}
	
$(".nav-anchor").hover(function(){
    $(this).css("color", "white");
    }, function(){
    $(this).css("color", "");
});

$("#howtouse").click(function(){ 
	howToUse()
				 
	});
    
	function howToUse() {
		$( "#howtouseDialog" ).dialog({ 
		    resizable: false,
			dialogClass: 'howToUseClass', 
			autoOpen: false,
			height: 487,
			width: 460,
			modal: true,
			buttons: {
				"OK": function() {
					
                    $( this ).dialog( "close" );
				},
				
			}
						
		});
		$( "#howtouseDialog" ).dialog( "open" );
	}
	$("#feedback").click(function(){ 
		feedback()
				 
	});
    
	function feedback() {
		$( "#feedbackDialog" ).dialog({ 
			dialogClass: 'feedbackDialogClass', 
			resizable: false,
			autoOpen: false,
			height: 450,
			width: 450,
			modal: true,
			buttons: [{
				text: "Send",
				"className": "buttonDialogStyle",
					click: function() {
						var feedbackMsg = $('#feedbackDescription').val();
						$.ajax({
							url: 'http://localhost:8080/mail', 
							type: 'POST', 
							data: JSON.stringify({message:feedbackMsg}), 
							contentType: "application/json; charset=utf-8",
						})
						$( this ).dialog( "close" );
						thankYou();	
					}
				},
			{
				"className": "buttonDialogStyle",
				text: "Cancel",
				click: function() {
                    $( this ).dialog( "close" );
				}
			}
			]			
		});
		$( "#feedbackDialog" ).dialog( "open" );
	}
	
	function thankYou() {
		
		$( "#thankYouDialog" ).dialog({ 
			resizable: false,
			dialogClass: 'thankYouDialogClass', 
			autoOpen: false,
			height: 237,
			width: 300,
			modal: true,
			buttons: {
				"Close": function() {
					
                    $( this ).dialog( "close" );
				},
			}
						
		});
		$('#thankYouDialog').dialog("open");
	}