// code from GitHub by @FriesFlorian
// TODO: run from Apache server to avoid error
//$.getScript("tplawesome.js");

$(function(){
	$("form").on("submit",function(e){
		e.preventDefault();
		// prepare YouTube Search API request
		var request = gapi.client.youtube.search.list({
			part: "snippet",
			type: "video",
			q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
			maxResults: 5,
			order: "viewCount",
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
});

function init(){
	gapi.client.setApiKey("AIzaSyA38kJ-p-UZLgjf3QWqKbABsgLFiAqbXfg");
	gapi.client.load("youtube","v3",function(){
		// yt api is ready
	});
}

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function tplawesome(template, data) {
	// initiate the result to the basic template
	res = template;
	// for each data key, replace the content of the brackets with the data
	for(var i = 0; i < data.length; i++) {
		res = res.replace(/\{\{(.*?)\}\}/g, function(match, j) { // some magic regex
			return data[i][j];
		})
	}
	return res;
}
