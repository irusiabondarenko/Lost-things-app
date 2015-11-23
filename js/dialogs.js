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
};

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
          url: window.location.origin + '/add', 
          type: 'POST', 
          data: JSON.stringify(lostThing), 
          contentType: "application/json; charset=utf-8",
          success: function(realData){
          visualizeLostThings(realData, map_var);		
          }
        });
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
};

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
      }
    }
  });
  $( "#howtouseDialog" ).dialog( "open" );
};
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
          url: window.location.origin + '/mail', 
          type: 'POST', 
          data: JSON.stringify({message:feedbackMsg}), 
          contentType: "application/json; charset=utf-8",
        });
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
      }]			
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
      };
    };
  });
  $('#thankYouDialog').dialog("open");
};