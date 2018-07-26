// code from GitHub by @FriesFlorian
// TODO: run from Apache server to avoid error
//$.getScript("tplawesome.js");

function search() {
		event.preventDefault();
		// prepare YouTube Search API request
// default is date
var order = "date";

$(function(){
	$("form").on("submit",function(e){
		e.preventDefault();
		
		// build YouTube Search API request
		var request = gapi.client.youtube.search.list({
			
			// specify that we are looking for video snippets
			part: "snippet",
			type: "video",
			
			// replace spaces with pluses
			q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
			
			// number and order of videos received
			// most recent -> "date", most popular -> "viewCount"
			maxResults: 5,
			order: order,
			
			// specify that we only want videos from our channel
			channelId: "UCdXtMm5nSlpZez3nkciKpng"
		});
		
		request.execute(function(response){
			console.log("Executed search request!");
			
			var results = response.result;
			$("#videosbody").html("");
			$.each(results.items, function(index, item) {
				$.get("item.html", function(data) {
					$("#videosbody").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
				});
			});
			resetVideoHeight();
		});
});

$('#popbutt').on('click', function(){
	order = "viewCount";
});

$('#recbutt').on('click', function(){
	order = "date";
});

function init(){
	
	// TODO hide API key
	gapi.client.setApiKey("AIzaSyA38kJ-p-UZLgjf3QWqKbABsgLFiAqbXfg");
	gapi.client.load("youtube","v3",function(){
		// yt api is ready
		console.log("YouTube Search API is ready");
	});
}

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




