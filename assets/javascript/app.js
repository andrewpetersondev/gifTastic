// global variables
// ======================================================================================================================================
// api_key=3w5nIdweFvSzSHVTMQ5JJUSte5wVyWqr
var topics = ["Archer", "Game of Thrones", "Family Guy", "Silicon Valley", "Billions"];



// functions
// ======================================================================================================================================

function createButton(topic) {
    // create a button
    var btn = $("<button>");
    // add text to button
    btn.text(topic);
    // add class to button
    btn.addClass("button-gif");
    // append to html
    $("#theme-buttons").append(btn);
}

function displayGifs() {
    // empty display every time a ".button-gif" is clicked
    $("#gif-display").empty();
    var show = $(this).text();
    console.log(show);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=3w5nIdweFvSzSHVTMQ5JJUSte5wVyWqr&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        console.log(results);
        // loop through each item in results
        for (var i = 0; i < results.length; i++) {
            // create a div for the gif result
            var gifDiv = $("<div>");
            // create a paragraph tag with the result items rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // create and store an image 
            var image = $("<img>");
            // add class .gif
            image.addClass("gif");
            // Setting the src attribute of the image to a property pulled off the result item
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("altsrc", results[i].images.fixed_height.url);
            // append dynamic variables to html
            gifDiv.append(image);
            gifDiv.append(p);
            $("#gif-display").append(gifDiv);
        }
    })
}

function toggleImage() {
    var picture = $(this).attr("src");
    $(this).attr("src", $(this).attr("altsrc"));
    $(this).attr("altsrc", picture);
}


// main processes
// ======================================================================================================================================

// on reload create dynamic buttons 
for (var i = 0; i < topics.length; i++) {
    createButton(topics[i]);
}

// from input (when submitted) create a dynamic button
$("#form-button").on("click", function (event) {
    event.preventDefault();
    var theme = $("#theme-input").val().trim();
    // if falsy
    if (!theme) {
        return;
    } else {
        createButton(theme);
    }
});

// when clicking a ".button-gif" 10 gifs are showed
$(document).on("click", ".button-gif", displayGifs);

// when clicking a gif toggle animate
$(document).on("click", ".gif", toggleImage);
