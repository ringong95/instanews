$( document ).ready(function() {

	$('#dropdown').heapbox({'onChange':function(){
		$('.main').addClass('shrunkheader');
		$('.loader').css('display','flex');	
		$('#dropdown option[value=selction').remove();
		$("#dropdown").heapbox("update"); //Updates heapbox to fit the change i just made to the selection it is based on
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

			
			var htmlinstert ='<li><a href=';
			var htmlmiddle = '><div class=article style=background-image:url(';
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
				var abstract = ')><div class="abstractpart"><div class="gradient"><p>'


				$('.article-section').append(htmlinstert+url+htmlmiddle+image+abstract+text+'</p></div></div>'+htmlinsterend);
			});
			$('.article-wrapper').slideDown(1000)
		})

		.always(function(){
		$('.loader').css('display','none')	
		});

	}
});
});	
