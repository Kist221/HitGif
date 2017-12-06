
// Array of queries we want the gif buttons for
var topics = [
    'Stitch',
    'Mulan',
    'Shrek',
    'Olaf'
];

var API_KEY = "mr6px3q7U5INW9F77t3FPX39Ib9i3P5i";

// function to return the query URL depending on what term you pass in
var createQueryURL = function(term){
    return 'https://api.giphy.com/v1/gifs/search?q=' + term + '&limit=10&api_key=' + API_KEY;
};

// function to return a button with input value
var createButton = function(term){
    // create button
    var btn = $('<button>')
        // add class to the button
        .addClass('gButton')
        // adds a data-location attribute
        .attr('data-name', term)
        // populates text inside the HTML element
        .text(term);
    // returns button to insert into DOM
    return btn;
};

// function to render buttons to page
var renderButtons = function() {
	// clear button area
	$("#gifButtons").empty().append("<h3>Click Topic To Generate</h3>");
	// loop through topic array
	for (var i = 0; i < topics.length; i++) {
		// append buttons to page
		$("#gifButtons").append(createButton(topics[i]));
	}
};

// function to create an image from given api array
var createImage = function(still, gif, alt){
	// create image
	var img = $("<img>")
		// add class
		.addClass("gPic")
		// add src to image
		.attr("src", still)
		// add alt text
		.attr("alt", alt)
		// store still url in data
		.attr("still", still)
		// store gif url in data
		.attr("gif", gif);
	// return image
	return img;
};

// function to switch image source from still to gif
var animate = function(img) {
	// if src is still image
	if ( $(img).attr("src") === $(img).attr("still") ) {
		// change source to gif
		$(img).attr("src", $(img).attr("gif"));
		console.log("still true", img);
	} else {
		// change source to still
		$(img).attr("src", $(img).attr("still"));
		console.log("still false");
	}
};

// track user submitting new button
$("#addGif").on("click", function(event) {
	event.preventDefault();
	// add input to topics array
	topics.push($("#gifInput").val().trim());
	// repush buttons to page
	renderButtons();
	// clear input field
	$("#gifInput").val("");
});

// change image state when clicked on
$("#images").on("click", ".gPic", function() {
	// run animate function
	animate(this);
});

// track button clicking
$("#gifButtons").on("click", ".gButton", function() {
	// clear images div
	$("#images").empty();
	// get value of button clicked
	var term = $(this).attr("data-name");
	console.log(term);
	// call api for images
	$.ajax({
		url: createQueryURL(term),
		method: "GET"
	}).done(function(response) {
		console.log(response);
		// add instructions
		$("#images").append("<h3>Click Image To Animate</h3>");
		// loop through available data in response
		for (var i = 0; i < response.data.length; i++) {
			// create gif with attributes
			var gif = createImage(response.data[i].images.fixed_width_still.url, response.data[i].images.fixed_width.url, response.data[i].title);
			// create div with img and rating html
			var add = $("<div>").append(gif, "<br /><p class='rating'>Rating: '" + response.data[i].rating + "'").addClass("gifContainer");
			// append add object to page
			$("#images").append(add);
		}
	});
});


renderButtons();