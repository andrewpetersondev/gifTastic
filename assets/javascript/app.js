var topics = ["Archer", "Game of Thrones", "Family Guy", "Silcon Valley", "Billions"];

//apiKEY = "3w5nIdweFvSzSHVTMQ5JJUSte5wVyWqr";

// on reload create at dynamic buttons 

for (var i = 0; i < topics.length; i++) {
    createButton(topics[i]);
}

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

// from input (when submitted) create a dynamic button

$("#form-button").on("click", function (event) {
    event.preventDefault();
    var theme = $("#theme-input").val().trim();
    createButton(theme);
})

// when clicking a button 10 gifs are showed
// when clicking a gif toggle animate