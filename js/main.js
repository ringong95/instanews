$( document ).ready(function() {
	$('#dropdown').change(function(){
		var input = $('select').val()
		var url = 'https://api.nytimes.com/svc/topstories/v2/'+input+'.json';
		$('.article-section').empty();
		url += '?' + $.param({
			'api-key': "2cee7ea7b62f4e7d83a741c409dae5e4"
		});
		$.ajax({
			url: url,
			method: 'GET',
		})

		.done(function(data){
			$('.main').addClass('shrunkheader');
			var htmlinstert ='<li><a href=';
			var htmlmiddle = '><div class=article style=background:url(';
			var htmlinsterend = '</div></a></li>';
			var info = [];
			info = $(data.results).filter(function(key,value){
				return $(value.multimedia).length>=5;
			})
			info.splice (12);
			$.each(info, function (key,value) {
				var image = value.multimedia[4].url;
				var url = value.url;
				var text = value.abstract;
				var abstract = ')><div class="abstractpart"><p>'


				$('.article-section').append(htmlinstert+url+htmlmiddle+image+abstract+text+'</p></div>'+htmlinsterend);
			});
		});
	});
});	
