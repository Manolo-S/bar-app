'use strict';

var number = 0;
var bars;
var barName;
var address;

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



function goingFun(bar){
	if (bar.name === barName && bar.location.address[0] === address){
		console.log('barName', bar.name);
		console.log('address', bar.location.address[0]);
	}
}


function success(results){
	// console.log(results);
	$("#search-results").empty();
	bars = results.businesses;
	console.log('bars', bars);
	results.businesses.map(displayResults)

	$('.going').click(function(e){
		e.preventDefault();
		var target = $(e.target);
		barName = target.siblings('a').text();
		address = target.attr('id');
		console.log('barName', barName, 'address', address);
		bars.map(goingFun);
	});
};




function displayResults(result){
	var div = "<div class='row bar'>"; 
	div += "<div class='col-sm-3'>";
	div += "<a href=" + result.url + " class='bar-name' target='_blank'>" + result.name + "</a>";
	div += "<button type='submit' class='btn btn-default btn-sm going' id='" + result.location.address + "'>" + number + " going" + "</button>"; //set id to address as two search results may have the same barname and different addresses 
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

// {"bar-name": "Hamilton", "address": "5th av", "city": "New York", "going": [{"id": 1, "social-media": "Twitter"}, {"id": 9, "social-media": "Facebook"}]}



