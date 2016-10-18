$( document ).ready(function() {

	$('#dropdown').heapbox({'onChange':function(){
		var curheight = 
		$('.main').addClass('shrunkheader');
		$('.loader').show();	
		$('#dropdown option[value=selction').remove();
		$("#dropdown").heapbox("update"); //Updates heapbox to fit the change i just made to the selection it is based on
		var input = $('select').val()
		var url = 'https://api.nytimes.com/svc/topstories/v2/'+input+'.json';
		$('.article-section').empty();
		$('.article-wrapper').hide();
		url += '?' + $.param({
			'api-key': "2cee7ea7b62f4e7d83a741c409dae5e4"
		});
		$.ajax({
			url: url,
			method: 'GET',
		})

		.done(function(data){

			
			
			var htmlmiddle = ;
			var htmlinsterend = '</div></a></li>';
			var info = [];
			info = $(data.results).filter(function(key,value){
				return $(value.multimedia).length>=5;
			})
			info.splice (12);


			$.each(info, function (key,value) {
				var url = '<li><a href='+value.url+">";
				var image = '<div class=article style=background-image:url('+value.multimedia[4].url+">";
				var text = ')><div class="abstractpart"><div class="gradient"><p>'+value.abstract+'</p></div></div></a></li>';


				$('.article-section').append(url+image+text);
			});
			$('.article-wrapper').slideDown(1000)
		})

		.always(function(){
			$('.loader').hide();	
		});

	}
});
});	
