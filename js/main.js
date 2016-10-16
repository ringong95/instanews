

$("#dropdown").change(function(){
	$('.article-section').empty();
	var input = $('select').val()
	var url = 'https://api.nytimes.com/svc/topstories/v2/'+input+'.json';
	url += '?' + $.param({
		'api-key': "2cee7ea7b62f4e7d83a741c409dae5e4"
	});
	// console.log(url)
	$.ajax({
		url: url,
		method: 'GET',
	})
// comments
.done(function(data){
	var htmladdition = "<div class='article' style='background:url(";
	var htmlendaddition = "')'</a></div>";
	var info = [];

	info = $(data.results).filter(function(key,value){

		return $(value.multimedia).length>=5;

	})
	
	info.splice (12);
	console.log(info)
	
	$.each(info, function(key,value){
		var image = value.multimedia[4].url;
		var text = value.abstract
		$('.article-section').append(htmladdition+image+"'><p>"+text+htmlendaddition);
				// $('.article-insertion').append("<p>"+text +"</p></div>");

			});
});



});