// code from GitHub by @FriesFlorian
// TODO: run from Apache server to avoid error
//$.getScript("tplawesome.js");

$(function(){
	// default is date
	var order = "date";
	console.log("Document ready.");
	
	$("form").on("submit",function(e){
		e.preventDefault();
		console.log("Submitting form...");
		
		// build YouTube Search API request
		var request = gapi.client.youtube.search.list({
			
			// specify that we are looking for video snippets
			part: "snippet",
			type: "video",
			
			// replace spaces with pluses for GET request
			q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
			
			// number and order of videos received
			// most recent -> "date", most popular -> "viewCount"
			maxResults: 5,
			order: order,
			
			// specify that we only want videos from our channel
			channelId: "UCdXtMm5nSlpZez3nkciKpng"
			
		});
		
		// execute HTTP request
		request.execute(function(response){
			
			console.log("Executed search request.");
			
			// collect results
			var results = response.result;
			
			// empty video display div
			$("#videosbody").html("");
			
			// if there are no applicable results, tell user
			if (results.length == 0){
				
				console.log("No search results found.");
				$("#videosbody").html('No tutorials found. Try entering something else.');
				
			} 
			// otherwise, show the results to user
			else {
				$.each(results.items, function(index, item) {
					$.get("item.html", function(data) {
						$("#videosbody").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
					});
				});
				resetVideoHeight();
			}
		});
	});
	
	$(window).on("resize", resetVideoHeight);
});

// when the filter buttons are clicked, set filters
$('#popbutt').on('click', function(){
	order = "viewCount";
	console.log(order);
});

$('#recbutt').on('click', function(){
	order = "date";
	console.log(order);
});

// function to initialize gAPI client
function init(){
	
	console.log("Initializing Google API client.");
	
	// TODO hide API key
	gapi.client.setApiKey("AIzaSyA38kJ-p-UZLgjf3QWqKbABsgLFiAqbXfg");
	gapi.client.load("youtube","v3",function(){
		// yt api is ready
		//console.log("YouTube Search API is ready");
	});
}

// video formatting
function resetVideoHeight() {
	$(".video").css("height", $("#videosbody").width() * 9/16);
}

function tplawesome(template, data) {
	// initiate the result to the basic template
	res = template;
	// for each data key, replace the content of the brackets with the data
	for(var i = 0; i < data.length; i++) {
		res = res.replace(/\{\{(.*?)\}\}/g, function(match, j) { // some magic regex
			return data[i][j];
		});
	}
	return res;
}




