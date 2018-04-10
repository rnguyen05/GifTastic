//Variables
var addNewAnimal;
var topics = ["cat", "dog", "rabbit", "hamster", "chicken", "duck", "goat", "cow", "donkey"];
var favorites = [];
var apiKey = "&api_key=BcWt5JuyihFp3RM11Nr17BruDdYTsu4q";
var queryAnimal;
var offset = 0;
var loadMore = 25;
var clickCount = 1;
var limit = "&limit=10";
var queryUrlBase = "https://api.giphy.com/v1/gifs/search?&q=";
//========================================================
//Methods
//Function to convert first char in a word to uppercase
function toTitleCase (str)
{
    return str.replace(/\w\S*/g, function (txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//Dislay all predifined animals in array
function displayArr () {
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button id='Btn'>")
        newBtn.addClass("btn btn-secondary  mr-1 mb-3").attr("value",topics[i]);
        newBtn.html(topics[i]);
        $("#displayBtn").append(newBtn);
    }
    //Display favorite images from locaStorage
    var tmp = localStorage.getItem("localStorageFav");
    if (tmp !== null) {
        var tmpArr = tmp.split('~');
        for (var i = 1; i < tmpArr.length; i++) {
            newTmp = stripQuotes(tmpArr[i]);
            favoriteGifs(newTmp);
        }
    }     
}

//Add new button to display
function addNewBtn (newElement) {
    var newBtn = $("<button>")
    newBtn.addClass("btn btn-secondary  mr-1 mb-3").attr("value",newElement);
    newBtn.html(newElement);
    $("#displayBtn").append(newBtn);
}

//Ajax function to fetch data
function fetchData (varOffset) {
    $.ajax({
        url: queryUrlBase + queryAnimal + apiKey + limit + varOffset,
        method: "GET"
    }).then(function(response) {
        //Display ajax results
        var results = response.data;
        for (var d = 0; d < results.length; d++) {
            var gifDiv = $("<div id='BtnImg' class='mr-3 mb-4'>");
            
            //Gif title
            var gifTitle = results[d].title;
            gifTitle = gifTitle.substring(0, gifTitle.indexOf('GIF'));
            //Gif Rating
            var gifRating = "<br />Rating: "+results[d].rating;
            //Favorite Icon
            var favoriteBtn = $("<button>");
            favoriteBtn.css("float","right");
            favoriteBtn.addClass("btn btn-fv btn-sm");
            favoriteBtn.attr("value",results[d].images.preview_gif.url);
            favoriteBtn.attr("title","Add to Favorites");
            favoriteBtn.html("<i class='fas fa-heart'></i>");

            //Download icon
            var downloadBtn = $("<button>");
            downloadBtn.css("float","right");
            downloadBtn.addClass("btn btn-dl btn-sm");
            downloadBtn.attr("value",results[d].images.fixed_height.url);
            downloadBtn.attr("title","Download");
            downloadBtn.html("<i class='fas fa-download'></i>");

            gifDiv.append("<strong>"+toTitleCase(gifTitle)+"</strong>");
            gifDiv.append(gifRating);
            gifDiv.append(downloadBtn);
            gifDiv.append(favoriteBtn);
            
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
}

//One Click download function
function downloadGif (data) {
    var dataUri = "data:application/image/gif;charset=utf-8,Col1%2CCol2%2CCol3%0AVal1%2CVal2%2CVal3%0AVal11%2CVal22%2CVal33%0AVal111%2CVal222%2CVal333";
    var filename = data;
    $("<a download='" + filename + "' href='" + dataUri + "'></a>")[0].click();
}

//Function to remove begin and end quotes in string
function stripQuotes(a) {
    if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
        return a.substr(1, a.length-2);
    }
    return a;
}

//Write to localStorage
function writeLocalStorage(data) {
    var old = localStorage.getItem("localStorageFav");
    if (old === null) {old = ""};
    localStorage.setItem("localStorageFav", old + "~" + data);
}

//Add to Favorite Gifs function
function favoriteGifs (addToFav) {
    if (favorites.indexOf(addToFav) == -1) {    
        favorites.push(addToFav);
        
        var newImg = $("<img>")
        newImg.attr("src",addToFav);
        newImg.attr("width","50");
        newImg.attr("height","50");
        newImg.css("margin","0px 2px 3px");
        $("#displayFav").append(newImg);  
    }
}

//Save to Favorites and localStorage
$("#displayAnimals").on('click', '.btn-fv', function () {
    var addToFav = $(this).val();
    $(".Fav").css("display","block");
    writeLocalStorage(JSON.stringify(addToFav));
    favoriteGifs(addToFav);
});

//Load images when topic button clicked
$("#displayBtn").on('click', '.btn', function () {
    $("#displayAnimals").empty();
    queryAnimal = $(this).val();
    offset = "&offset="+offset;
    fetchData(offset);
});

//Load more button
$("#loadMore").on('click', function () {
    offset = "&offset="+loadMore*clickCount;
    fetchData(offset);
    clickCount++;
});

//Download button
$("#displayAnimals").on('click', '.btn-dl', function () {
    var gifFile = $(this).val();
    //Call downloadGif function
    downloadGif(gifFile);
});

//Data state 
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

//Add new topic button
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
