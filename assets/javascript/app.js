var goodShows = ['futurama', 'simpsons', 'scrubs', 'harvey birdman attorney at law', '30 rock', 'community', 
'parks and recreation', 'psych'];

function createButtons() {
	$('#buttons').children().remove();
	$(goodShows).each(function(){
		$('#buttons').append($('<button>').text(this));
	});
}

function buildImageSet(url,alt,rating,div){
	var img = $('<img>');
	var wrapDiv = $('<div>');
	var p = $('<p>');
	img.attr('src',url);
	img.attr('alt', alt);
	img.attr('data-state', 'still');
	wrapDiv.html(img);
	wrapDiv.append(p.text("Rating: "+rating));
	div.prepend(wrapDiv);
}

function convertImg(stillUrl,animateUrl){
	$('img').on('click',function(){
		var state = $(this).attr('data-state');
		if (state === 'still') {
			$(this).attr("src", animateUrl);
		    $(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', stillUrl);
			$(this).attr('data-state', 'still');
		}
	})
}

createButtons();

$('.add-it').on('click',function(e) {
	if($('#add-show').val() !== ''){
		goodShows.push($('#add-show').val().trim());
		createButtons();
	}
	e.preventDefault();
});

var gifDiv = $('<div>').attr('id','gifs').insertAfter('#buttons');

$('#buttons').on('click','button', function() {
	$('#gifs').children('div').remove();
	$button = $(this).text();
	var queryUrl = 'http://api.giphy.com/v1/gifs/search?';
	queryUrl += $.param({
		'api_key': 'zKdBO34ncJrTR15wdUTBAwMWyuAjcXx1',
		'q': $button,
		'rating': 'pg'
	});

	$.ajax({
		url: queryUrl,
		method: "GET"
	})

	.then(function(response) {
		// console.log(response.data);
		for (var i = 0; i < 10; i++) {
			var randNum = Math.floor(Math.random() * 25);
			var dataResp = response.data[randNum]
			var imageStillUrl = dataResp.images.fixed_width_still.url;
			var imageUrl = dataResp.images.fixed_width.url
			var imageAlt = dataResp.title;
			var rating = dataResp.rating;

			buildImageSet(imageUrl, imageAlt, rating, $('#gifs'));
			
		}
		
		
	});

});