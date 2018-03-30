//Variables
var addNewAnimal;
var animalsArr = ["cat", "dog", "rabbit", "hamster", "chicken", "duck", "goat", "cow", "dorkey"];
var apiKey = "&api_key=BcWt5JuyihFp3RM11Nr17BruDdYTsu4q";
var queryAnimal;
var queryUrlBase = "http://api.giphy.com/v1/gifs/search?limit=10&q=";
// var queryUrlBase = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=BcWt5JuyihFp3RM11Nr17BruDdYTsu4q&limit=5"
//========================================================
//Ajax query and results



//========================================================
//Methods
//Button click event listener to call ajax
$("#displayBtn").on('click', '.btn', function (e) {
    var queryAnimal = $(this).val();
    $.ajax({
        url: queryUrlBase + queryAnimal + apiKey,
        method: "GET"
    }).then(function(response) {
        //Display ajax results
        var results = response.data;
        for (var d = 0; d < results.length; d++) {
            var gifDiv = $("<div class='gifitem'>")
            
            var gifRating = results[d].rating;
            var gifImg = $("<img>");
            gifImg.attr("src",results[d].images.fixed_height.url);
            
            gifDiv.append("<p>Rating: "+gifRating+"</p>");
            gifDiv.append(gifImg);

            $("#displayAnimals").append(gifDiv);   
        }
    });
    e.preventDefault();
});


//Dislay all predifined animals in array
function displayArr () {
    for (var i = 0; i < animalsArr.length; i++) {
        var newBtn = $("<button id='Btn'>")
        newBtn.addClass("btn btn-secondary  mr-1 mb-3").attr("value",animalsArr[i]);
        newBtn.html(animalsArr[i]);
        $("#displayBtn").append(newBtn);
    }
};

//Add new button to display
function addNewBtn (newElement) {
    console.log(animalsArr);
    var newBtn = $("<button>")
    newBtn.addClass("btn btn-secondary  mr-1 mb-3").attr("value",newElement);
    newBtn.html(newElement);
    $("#displayBtn").append(newBtn);
};

//Add an Animal button click event listener
$(".btn").on('click', function () {
    addNewAnimal = $("#newAnimal").val().toLowerCase().trim();
    if (addNewAnimal.length !== 0) {
        addNewBtn(addNewAnimal);
        //Clear form value on submit clicked
        $("form").trigger("reset");
    }
    else {
        alert("Please Enter an Animal.");
    }
    return false;
});

displayArr();
