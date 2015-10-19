// Info window content
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


// function for generation uniqueID
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

//deleteThing request to server
function deleteThing() {
	
	$.ajax({
		url: window.location.origin + '/delete', 
		type: 'POST', 
		data: JSON.stringify ({unique_id: curMarker.markerId}), 
		contentType: "application/json; charset=utf-8",
		success: 
	     document.location.reload(true)
	
	})
}
