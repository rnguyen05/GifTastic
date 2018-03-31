//Variables
var addNewAnimal;
var topics = ["cat", "dog", "rabbit", "hamster", "chicken", "duck", "goat", "cow", "donkey"];
var apiKey = "&api_key=BcWt5JuyihFp3RM11Nr17BruDdYTsu4q";
var queryAnimal;
var loadMore;
var queryUrlBase = "http://api.giphy.com/v1/gifs/search?limit=10&q=";
//========================================================
//Methods
//Button click event listener to call ajax to display images
$("#displayBtn").on('click', '.btn', function () {
    $("#displayAnimals").empty();
    var queryAnimal = $(this).val();
    $.ajax({
        url: queryUrlBase + queryAnimal + apiKey,
        method: "GET"
    }).then(function(response) {
        //Display ajax results
        var results = response.data;

        for (var d = 0; d < results.length; d++) {
            var gifDiv = $("<div id='BtnImg' class='mr-3 mb-4'>");
            var gifRating = "Rating: "+results[d].rating;
            var gifImg = $("<img>");
            gifImg.attr("src",results[d].images.fixed_height_still.url);
            gifImg.attr("data-still",results[d].images.fixed_height_still.url);
            gifImg.attr("data-animate",results[d].images.fixed_height.url);
            gifImg.attr("data-state","still");
            gifImg.attr("class","gifImg");
            
            gifDiv.append(gifRating);
            gifDiv.append(gifImg);
            $("#displayAnimals").append(gifDiv);   
        }
        

    });
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
$(".btn").on('click', function (e) {
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
