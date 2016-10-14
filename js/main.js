

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
	var htmlendaddition = "')'</p></div>";
	var info = [];

	// for (var i = 0; info.length=== 12; i++){
		 info = $(data.results).filter(function(key,value){
		 	
			return $(value.multimedia).length!=0;

		})
		 console.log(info)
		// }

console.log(info)
		$.each(data.results, function(key,value){
			// console.log(value.multimedia.length)
			if(value.multimedia.length ==0)
			{}
		else{
			var image = value.multimedia[4].url;
			var text = value.abstract
			$('.article-section').append(htmladdition+image+"'><p>"+text+htmlendaddition);
				// $('.article-insertion').append("<p>"+text +"</p></div>");
			}
		});
	});



});