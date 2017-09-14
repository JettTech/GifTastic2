$(document).ready(function() { 
	console.log("Page has loaded...")
 // ----------------------------------- DECLARE VAROABLES &&& FUNCTIONS------------------------------------------------
	var	searchTermArray = ["Superman", "Batman", "Wonderwoman", "Poison Ivy"];
	var searchTerm = "";
	var searchTermNum = [];

	function createGifButton (searchArray, gifClass, searchNo, gifPostArea) {
		// $("#gifArea").empty();
		$(gifPostArea).empty();

		for (var i = 0; i < searchArray.length; i++) {
				var button = $("<button>");
				button.addClass(gifClass);
				button.attr("data-type", searchArray[i]); //this assigns an attribue called 'data-type' with a value that ==== the value of the current index in the sesarchTermArray, which in this case is a superhero name (ie. batman).
				button.attr("data-num", searchNo[i])
				button.text(searchArray[i]); //this displays the value (in this case === a superhero name) of the item in the area.
				$(gifPostArea).append(button);
			}
		};

	function clear() {
		$("#searchBox").val("");
		$("#gifAmount").val("");
		$("#searchedGif").empty();
		searchTermArray = [];
	}

 // ----------------------------------- RUN APP ------------------------------------------------

	createGifButton(searchTermArray, "searchedGif", searchTermNum, "#searchedGif");

	$("#searchBox").on("click", function() { //This resets the search box each time someone clicks inside it!
		$("#searchBox").val("");
		$("#gifAmount").val("");
	});

	$("#clearButton").on("click", function() { //This is the reset button value.
		clear();
	});

	$("#gifSearchButton").on("click", function() {
		event.preventDefault();
		
		// searchTermArray = []; Don't need to empty out the area because the display space is being refreshed each time INSTEAD!
		searchTerm = $("#searchBox").val();
		console.log(searchTerm);

		searchTermNum = $("#gifAmount").val();
		console.log(searchTermNum);

		if (searchTermNum <= 0) {
			alert("You must select a positive integer. The more GIFs the merrier!");
			clear();
			return;
		}

		searchTermArray.push(searchTerm);
		console.log(searchTermArray);

		createGifButton(searchTermArray, "searchedGif", searchTermNum, "#searchedGif");

		console.log($(".searchedGif").data("type")); //Why does this NOT console log ALL the buttons with the class ".searchedGIF"???, &&& Why does it only ALWAYS list the first search data (title/num) info?!
		console.log($(".searchedGif").data("num")); // The same as above!

		$("#gifArea").text("Click on the GIF button(s) above to reveal the power of your GIF!");

		return false; //Don't need this fearture because, not useing a input element wieht a submit type/prop.
	});	




 //----------------------------------- Starting point for api interface.. getting and displaying the GIFs!!!!!!-------------------------------- 

	// $(document).on("click", ".searchedGif", function () {
	$(".searchedGif").on("click", function(){
		event.preventDefault();
		
		console.log("I am running.");

		$("#gifArea").empty();

		var gifTypeValue = $(this).data("type");
		var gifTypeNum = $(this).data("num");
		
		console.log($(this).data("type")); //should match previous
		console.log($(this).data("num")); //should match previous

		var rating = "PG-13" || "PG" || "G"; //setting the rating parameters (?? -> parameters? correct term? ??)

		var apiKey = "c543e1e3482945068cddd1abaf372398";
		var url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + gifTypeValue + "&limit=" +
		 gifTypeNum + "&rating=" + rating + "&lang=en";
		console.log("URL= " + url);

		// TEST URLs -->STILL NOT WORKING?!?!?!:
		// var url = "https://api.giphy.com/v1/gifs/search?api_key=c543e1e3482945068cddd1abaf372398&q=superman&limit=10&offset=0&rating=G&lang=en"

		$.ajax({url: url, method: "GET"})
			.done(function(result) {
				console.log("This is the result:" + result); // review the result for QA
				console.log("URL: " + url + "IS working...");

				$("#gifHeaderImg").attr("src", "/static/img/api.c99e353f761d.gif"); //make the static img - the main animaated GIF instead
				$("#gifDiplayHeader").text("GIFs IN ACTION - " + gifTypeValue + ("!!"));  //Change the tite to include a mention to the current search


				for (var j = 0; j < result.data.length; i++) { //(*IT IS CRUTIAL TO REMEBER TO PUT RESULT.DATA.LENGTH as we are cylcing thefour the RESULT'S
				 // DATA info, and not an array called results with many types of names/values!!!*)			

					var gifDisplayDiv = $("<div class='gifResult'>"); //creating div in which to place the GIF displays --> will append this to the gifArea!
					var gifRating = result.data[j].rating; //adding rating to display alongside: 1) step one is grab value of rating
					// var p = ("<p>").text("Rating: " + gifRating); 2) step two is place that value into a <p>tag.
					
					var animated = result.data[j].images.downsized_medium.url;
					var still = result.data[j].images.downsized_still.url;
					var image = $("<img>");
					image.attr("data-still", still); //reference the url for the still GIF
					image.attr("data-animated", animated); //reference the url for the animated
					image.attr("data-state", "still"); //Setting the current status to "still"  --> this is GIF default state
					image.addClass("finalGifImage");//CREATE a class for the 
					
					gifDisplayDiv.append(p);
					gifDisplayDiv.append(image);
					$("#gifArea").append(gifDisplayDiv);
					
					$(document).on("click",".finalGifImage", function() {
						var state = $(this).attr("data-state");
						if(state == "still"){
							$(this).attr("src", $(this).data("animated"));
							$(this).attr("data-state", "animated");
						}
						else {
							$(this).attr("src", $(this).data("still"));
							$(this).attr("data-state", "still");
						}
					})
			
					.fail(function(err) {
				  		throw err;
					});
				};
			});

			var clearDisplay = $("<button>").addclass("clearDisplay").text("Out of sight, out of mind.");
			$(".clearDisplay").on("click", function() { //clears the displayed GIFs
				$("#gifArea").empty();
			});

	});

}); //end of js file.


// ------------- Personal Qs&Memo Section--------------------
// $("#gifArea").text(JSON.stringify(result));  //Clarify when use this terminology...

//difference between "$(document).ready(function() { ....});" AND "$(fucntion({ ..... });" ???!!!  --> these both wait to trigger the JS file until the page is loaded, correct?