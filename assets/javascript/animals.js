//Variables
var addNewAnimal;
var topics = ["cat", "dog", "rabbit", "hamster", "chicken", "duck", "goat", "cow", "donkey"];
var apiKey = "&api_key=BcWt5JuyihFp3RM11Nr17BruDdYTsu4q";
var queryAnimal;
var loadMore = 25;
var clickCount = 1;
var limit = "&limit=10";
var queryUrlBase = "http://api.giphy.com/v1/gifs/search?&q=";
//========================================================
//Methods
//Function to convert first char in a word to uppercase
function toTitleCase (str)
{
    return str.replace(/\w\S*/g, function (txt)
    {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//Button click event listener to call ajax to display images
$("#displayBtn").on('click', '.btn', function () {
    $("#displayAnimals").empty();
    queryAnimal = $(this).val();
    $.ajax({
        url: queryUrlBase + queryAnimal + apiKey + limit,
        method: "GET"
    }).then(function(response) {
        //Display ajax results
        var results = response.data;
        console.log(results);
        for (var d = 0; d < results.length; d++) {
            var gifDiv = $("<div id='BtnImg' class='mr-3 mb-4'>");
            
            //Gif title
            var gifTitle = results[d].title;
            gifTitle = gifTitle.substring(0, gifTitle.indexOf('GIF'));
            //Gif Rating
            var gifRating = "<br />Rating: "+results[d].rating;
            //Gif download button
            var downloadBtn = $("<button>");
            downloadBtn.css("float","right");
            downloadBtn.addClass("btn btn-link btn-sm");
            downloadBtn.attr("href",results[d].url);
            downloadBtn.html("Download");

            gifDiv.append(toTitleCase(gifTitle));
            gifDiv.append(gifRating);
            gifDiv.append(downloadBtn);

            var gifImg = $("<img>");
            gifImg.attr("src",results[d].images.fixed_height_still.url);
            gifImg.attr("data-still",results[d].images.fixed_height_still.url);
            gifImg.attr("data-animate",results[d].images.fixed_height.url);
            gifImg.attr("data-state","still");
            gifImg.attr("class","gifImg");
            gifDiv.append(gifImg);

            $("#displayAnimals").append(gifDiv);   
        }
        //Display load more option button
        $("#loadMore").css("display", "block");
    });
});

//If loadMoreBtn clicked
$("#loadMore").on('click', function () {
    var offset = "&offset="+loadMore*clickCount;
    $.ajax({
        url: queryUrlBase + queryAnimal + apiKey + limit + offset,
        method: "GET"
    }).then(function(response) {
        //Display ajax results
        var results = response.data;
        for (var d = 0; d < results.length; d++) {
            var gifDiv = $("<div id='BtnImg' class='mr-3 mb-4'>");
            //Display gif title
            var gifTitle = results[d].title;
            gifTitle = gifTitle.substring(0, gifTitle.indexOf('GIF'));
            //Gif Rating
            var gifRating = "<br />Rating: "+results[d].rating;
            //Gif download button
            var downloadBtn = $("<button>");
            downloadBtn.css("float","right");
            downloadBtn.addClass("btn btn-link btn-sm");
            downloadBtn.attr("href",results[d].images.fixed_height.url);
            downloadBtn.html("Download");
            //Append to displayAnimals div
            gifDiv.append(toTitleCase(gifTitle));
            gifDiv.append(gifRating);
            gifDiv.append(downloadBtn);

            var gifImg = $("<img>");
            gifImg.attr("src",results[d].images.fixed_height_still.url);
            gifImg.attr("data-still",results[d].images.fixed_height_still.url);
            gifImg.attr("data-animate",results[d].images.fixed_height.url);
            gifImg.attr("data-state","still");
            gifImg.attr("class","gifImg");
            gifDiv.append(gifImg);

            $("#displayAnimals").append(gifDiv);   
        }
        //Display load more option button
        $("#loadMore").css("display", "block");
        console.log(loadMore);
    });
    clickCount++;
    
});

//Download button click event listener
$(".btn-link").on('click', function () {

});

//Button click event listener to pause gif images
$("#displayAnimals").on('click', ".gifImg",function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }  
});


//Dislay all predifined animals in array
function displayArr () {
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button id='Btn'>")
        newBtn.addClass("btn btn-secondary  mr-1 mb-3").attr("value",topics[i]);
        newBtn.html(topics[i]);
        $("#displayBtn").append(newBtn);
    }
};

//Add new button to display
function addNewBtn (newElement) {
    var newBtn = $("<button>")
    newBtn.addClass("btn btn-secondary  mr-1 mb-3").attr("value",newElement);
    newBtn.html(newElement);
    $("#displayBtn").append(newBtn);
};

//Add an Animal button click event listener
$(".btn-outline-secondary").on('click', function (e) {
    addNewAnimal = $("#newAnimal").val().toLowerCase().trim();
    if (addNewAnimal.length !== 0) {
        addNewBtn(addNewAnimal);
        //Clear form value on submit clicked
        $("form").trigger("reset");
    }
    else {
        alert("Please Enter an Animal.");
    }
    e.preventDefault();
    return false;
});

displayArr();
