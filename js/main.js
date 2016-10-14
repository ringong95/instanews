
var url ="";
$("#dropdown").change(function(){
	
	var input = $('select').val()
	$('.article-insertion').empty();
	var url = "https://api.nytimes.com/svc/topstories/v2/"+input+".json";
	url += '?' + $.param({
		'api-key': "2cee7ea7b62f4e7d83a741c409dae5e4"
	});
	console.log(url)
	$.ajax({
		url: url,
		method: 'GET',
	})

	.done(function(data) {
		console.log(data.results);
		
		$.each(data.results, function(key,value){
			console.log(value.multimedia.length)
			if (value.multimedia.length ==0)
			{
			}
			else
			{
				var image = value.multimedia[3].url;
				var text = value.abstract
				$('.article-insertion').append("<div class="+'"article"'+"><img src='"+image+"''><p>"+text +"</p></div>");
				// $('.article-insertion').append("<p>"+text +"</p></div>");
			}
		});
	})

	.fail(function(err) {
		throw err;
	});

});