function fetchRecommendations(callback) {
	var temp = $.getJSON('data/laptop-data.json', function(json) {
		var ids = [];
		var id_data = [];
	    $.each( json, function( id, data ) {
			ids.push(id);
			id_data.push(data);
		});
		callback([ids, id_data]);
	});
}

function showInfoSection() {
	if ($(window).width() > 599) {
		$("#laptop-info-section").css('visibility', 'visible');	
	} else {
		$("#laptop-info-section").fadeToggle(200);
    	$("#close-button").add('#info-title').add('.mdc-toolbar__section--align-end').show();
    	$("#list-title").add("#info-dialog-activation").hide();
  	}        
}

// function hideInfoSection() {
// 	if ($(window).width() > 599) {
// 		$("#laptop-info-section").css('visibility', 'hidden');
// 	} else {
// 		$("#laptop-info-section").fadeToggle(200);
//     	$("#close-button").add('#info-title').add('.mdc-toolbar__section--align-end').hide();
//     	$("#list-title").add("#info-dialog-activation").show();
// 	}
// }

var lastClicked;

$(document).ready(function() {
	fetchRecommendations(function(data) {
		var ids = data[0];
		var id_data = data[1];

		$.each(ids, function(i) {
			createListEntry(ids[i], id_data[i]);
		});
		$('li').click(function() {
			var clicked = this.id;
			var index = ids.indexOf(clicked);

			if (lastClicked == null || $("#laptop-info-section").css('display') == 'none') {
				showInfoSection();
			}
 			if (clicked != lastClicked) {
				lastClicked = clicked;
				createInfoSection(ids[index], id_data[index]);
 			}                 
      });
      	$("#close-button").click(function() {
          	$("#laptop-info-section").fadeToggle(200);
          	$("#close-button").add('#info-title').hide();
          	$("#list-title").add("#info-dialog-activation").add('.mdc-toolbar__section--align-end').show();
      	});
	});
});