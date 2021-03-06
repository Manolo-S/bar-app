'use strict';

(function (){

	var bars;
	var barsGoing;
	var barName;
	var address;
	var goingData = [];
	var id;
	var socialMedia;

	$('#search-button').click(function(e){
		e.preventDefault();
		var searchStr = $('#search-box').val()
	    $.post('http://localhost:3000/search', {"searchStr": searchStr}, success).fail(function(xhr){
				Raven.captureException(new Error('post to /search: ' + xhr.statusText))
		});
	    // $.post('https://local-bars.herokuapp.com/search', {"searchStr": searchStr}, success).fail(function(xhr){
				// Raven.captureException(new Error('post to /search: ' + xhr.statusText))
		// });
	});


	$('#twitter-a, #facebook-a').click(function(e){
		var searchStr = $('#search-box').val();
		store.set('searchStr', searchStr);
	});

	
	function goingFun(bar){
		if (bar.name === barName && bar.location.address[0] + " " + bar.location.city === address){
			console.log('barName', bar.name);
			console.log('address', bar.location.address[0]);
	        $.post('http://localhost:3000/going', {"barName": barName, "address": address, "socialMedia": "Twitter", "id": 456}).fail(function(xhr){
				Raven.captureException(new Error('post to /going: ' + xhr.statusText))
					});
	   //      $.post('https://local-bars.herokuapp.com/going', {"barName": barName, "address": address, "socialMedia": socialMedia, "id": id}).fail(function(xhr){
				// Raven.captureException(new Error('post to /going: ' + xhr.statusText))
		// });
		}
	}

	function peopleGoing(bar){
		barsGoing.push({"barName": bar.name, "address": bar.location.address[0] + " " + bar.location.city});
	}

	function addGoingData(bar1){
		console.log('addgoingdata called');
		bar1.numberGoing = 0;
		goingData.map(function (bar2){if (bar1.name === bar2.barName){console.log(bar1.name); bar1.numberGoing = bar2.numberGoing}});
	}

	function cb(data){
			goingData = data;
			bars.map(addGoingData);
			bars.map(displayResults);
			$('.going-button').click(function(e){
				console.log('going button');
				e.preventDefault();
				id = $('#id').text();
				socialMedia = $('#service').text();
				id = 456; //TODO remove
				socialMedia = "Twitter"; //TODO remove
				console.log("*" + id + "*");
				if (id === ""){
					return;
				}
				var target = $(e.target);
				var numberGoing = Number(target.children('span').text());
				if (target.children('span').attr('class') === 'not-going'){
					numberGoing++;
					target.children('span').removeClass('not-going').addClass('going');
				} else {
					numberGoing--;
					target.children('span').removeClass('going').addClass('not-going');
				}
				target.children('span').text(numberGoing);
				console.log('num going', numberGoing);
				barName = target.siblings('a').text();
				address = target.attr('id');
				bars.map(goingFun);
			});
	}


	function success(results){
		$("#search-results").empty();
		barsGoing = [];
		bars = results.businesses;
		console.log('bars', bars);
		bars.map(peopleGoing);
		$.post('http://localhost:3000/barsGoing', {'bars': barsGoing}, cb).fail(function(xhr){
				Raven.captureException(new Error('post to /barsGoing: ' + xhr.statusText))
		});
		// $.post('https://local-bars.herokuapp.com/barsGoing', {'bars': barsGoing}, cb).fail(function(xhr){
		// 		Raven.captureException(new Error('post to /barsGoing: ' + xhr.statusText))
		// });
	};




	function displayResults(result){
		var div = "<div class='bar'>";
		div += "<div class='row'>"; 
		div += "<div class='col-sm-12'>";
		div += "<a href=" + result.url + " class='bar-name' target='_blank'>" + result.name + "</a>";
		div += "<button type='submit' class='btn btn-default btn-sm going-button' id='" + result.location.address + " " + result.location.city + "'><span class='not-going'>" + result.numberGoing + "</span> going" + "</button>"; //set id to address as two search results may have the same barname and different addresses 
		div += "</div>"; //col-sm-12
		div += "</div>"; //row
		div += "<div class='row'>";
		div += "<div class='col-sm-2'>";
		div += "<img src=" + result.rating_img_url + " class='rating-img'>";
		div += "<p class='reviews'>Reviews: " + result.review_count + "</p>";
		div += "<img src=" + result.image_url +" class='bar-img'>";
		div += "</div>"; //col-sm-4
		div += "<div class='col-sm-10 text-block'>";
		div += "<p>Address: " + result.location.address[0] + ", " + result.location.city + "</p>";
		div += "<p>Phone: " + result.display_phone + "</p>";
		div += '<p class="snippet">"' +  result.snippet_text + '"</p>';
		div += "</div>"; // col-sm-8
		div += "</div>";  // row 2
		div += "</div>"; 
		$("#search-results").append(div);
	}

	if (store.get('searchStr')) {
		var searchStr = store.get('searchStr');
		if (searchStr !== ""){
			$.post('https://local-bars.herokuapp.com/search', {"searchStr": searchStr}, success).fail(function(xhr){
				Raven.captureException(new Error('post to /search: ' + xhr.statusText))
			});
		}
		store.remove('searchStr');
	}

})();

