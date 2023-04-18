// global variables
// ======================================================================================================================================

// initial buttons when page loads
var topics = [
  "Archer",
  "Game of Thrones",
  "Family Guy",
  "Silicon Valley",
  "Billions",
]

// functions
// ======================================================================================================================================

function createButton(topic) {
  var btn = $("<button>")
  btn.text(topic)
  btn.addClass("button-gif")
  $("#theme-buttons").append(btn)
}

function displayGifs() {
  $("#gif-display").empty()

  // variables for ajax call
  var show = $(this).text()
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    show +
    "&api_key=3w5nIdweFvSzSHVTMQ5JJUSte5wVyWqr&limit=10"

  // ajax call to giphy api
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // ajax response
    var results = response.data

    // create a div for each item in response and give it content and attributes
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>")
      var image = $("<img>")
      image.addClass("gif")
      image.attr("src", results[i].images.fixed_height_still.url)
      image.attr("altsrc", results[i].images.fixed_height.url)
      var p = $("<p>").text("Rating: " + results[i].rating)
      // output to html
      gifDiv.append(image)
      gifDiv.append(p)
      $("#gif-display").append(gifDiv)
    }

    // testing and debugging
    console.log(show)
    console.log(queryURL)
    console.log(response)
    console.log(results)
  })
}

function toggleImage() {
  var picture = $(this).attr("src")
  $(this).attr("src", $(this).attr("altsrc"))
  $(this).attr("altsrc", picture)
}

// main processes
// ======================================================================================================================================
$(document).ready(function () {
  // on page load create buttons
  for (var i = 0; i < topics.length; i++) {
    createButton(topics[i])
  }

  // from input (when submitted) create a dynamic button
  $("#form-button").on("click", function (event) {
    event.preventDefault()
    var theme = $("#theme-input").val().trim()
    // if falsy
    if (!theme) {
      return
    } else {
      createButton(theme)
    }
  })

  // when clicking a ".button-gif" 10 gifs are showed
  $(document).on("click", ".button-gif", displayGifs)

  // when clicking a gif toggle animate
  $(document).on("click", ".gif", toggleImage)
})
