'use strict';

var number = 0;

$('#search-box').keypress(function(e){
	if (e.which === 13){
		var searchStr = $('#search-box').val()
        $.post('http://localhost:3000/search', {"searchStr": searchStr}, success);
	}
});

$('#search-button').click(function(e){
	e.preventDefault();
	var searchStr = $('#search-box').val()
    $.post('http://localhost:3000/search', {"searchStr": searchStr}, success);
});



function success(results){
	console.log(results);
	$("#search-results").empty();
	results.businesses.map(displayResults)
};


function displayResults(result){
	var div = "<div class='row bar'>"; 
	div += "<div class='col-sm-3'>";
	div += "<a href=" + result.url + " class='bar-name' target='_blank'>" + result.name + "</a>";
	div += "<button type='submit' class='btn btn-default btn-sm going'>" + number + " going" + "</button>";
	div += "<img src=" + result.rating_img_url + " class='rating-img'>";
	div += "<p class='reviews'>Reviews: " + result.review_count + "</p>";
	div += "<img src=" + result.image_url +" class='bar-img'>";
	div += "</div>"; //col-sm-4
	div += "<div class='col-sm-9 text-block'>";
	div += "<p>Address: " + result.location.address[0] + ", " + result.location.city + "</p>";
	div += "<p>Phone: " + result.display_phone + "</p>";
	div += '<p class="snippet">"' +  result.snippet_text + '"</p>';
	div += "</div>"; // col-sm-8
	div += "</div>";  // row
	div += "</div>";  //container
	$("#search-results").append(div);
}

