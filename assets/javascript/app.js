var goodShows = ['futurama', 'simpsons', 'scrubs', 'harvey birdman attorney at law', '30 rock', 'community', 
'parks and recreation'];

$(goodShows).each(function(){
	$('#buttons').append($('<button>').text(this));
});

var gifDiv = $('<div>').attr('id','gifs').insertAfter('#buttons');
$('#buttons').on('click','button', function() {
	$button = $(this).text();
	var queryUrl = 'http://api.giphy.com/v1/gifs/search?';
	queryUrl += $.param({
		'api_key': 'zKdBO34ncJrTR15wdUTBAwMWyuAjcXx1',
		'q': $button
	});

	$.ajax({
		url: queryUrl,
		method: "GET"
	})

	.then(function(response) {
		var imageUrl = response.data[0].images.original.url;
		//console.log(imageUrl);
		var img = $('<img>');
		img.attr('src',imageUrl);
		$('#gifs').prepend(img);
	});

});