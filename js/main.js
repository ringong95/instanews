$( document ).ready(function() {
	
		$('#dropdown').heapbox({'onChange':function(){
		
			$('.main').addClass('shrunkheader');
			$('.loader').show();	
			$('#dropdown option[value=selction').remove();// this removes the selection option from the html dom thing
			$("#dropdown").heapbox("update"); //Updates heapbox to fit the change i just made to the selection it is based on the html dom and effect the dom dom
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

			var info = [];
			// the filter function here lets it dig through the array and keep only the hinted ones and put that into the varrible Info
			info = $(data.results).filter(function(key,value){
				return $(value.multimedia).length>=5;
				// it "returns" back only ones that fulfill that requirement
			})
			info.splice (12);
			// this i over thought so much it just cuts out everything past the 12th one

			var articleinsertion = ""
			$.each(info, function (key,value) {
				articleinsertion += '<li><a href='+value.url+">";
				articleinsertion += '<div class=article style=background-image:url('+value.multimedia[4].url+">";
				articleinsertion += '<div class="abstractpart"><div class="gradient"><p>'+value.abstract+'</p></div></div></div></a></li>';
				// This is an absolute mess of appending im not sure how i would want to do this in a cleaner fashion

				
			});
			$('.article-section').append(articleinsertion);
			$('.article-wrapper').slideDown(1000)

		})

		.always(function(){
			$('.loader').hide();	
		});

	}
});
});	
