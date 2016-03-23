'use strict';

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
	results.businesses.map(displayResults)
	$(function() {
    $('span.stars').stars();
});
}

function displayResults(result){
	var div = "<div>";
	div += "<img src=" + result.image_url +" class='barImage'>";
	div += "<h4 class='bar-name'>" + result.name + "</h4>";
	div += "<img src=" + result.rating_img_url + ">";
	div += "</div>";
	$("#search-results").append(div);
}

