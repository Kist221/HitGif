
// Array of queries we want the gif buttons for
var queries = [
    'Stitch',
    'Mulan',
    'Shrek',
    'Olaf'
];

var API_KEY = "mr6px3q7U5INW9F77t3FPX39Ib9i3P5i";

// return the query URL depending on what term you pass in
var createQueryURL = function(term){
    return 'http://api.giphy.com/v1/gifs/search?q=' + term + '&limit=10&api_key=' + API_KEY;
};

// return a button with input value
var createButton = function(term){
    // create button
    var btn = $('<button>')
        // add class to the button
        .addClass('button')
        // adds a data-location attribute
        .attr('data-name', term)
        // populates text inside the HTML element
        .text(term);
    // returns button to insert into DOM
    return btn;
};
