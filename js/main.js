$( document ).ready(function() {
	
	$('#dropdown').heapbox({'onChange':()=>{
		
		$('.main').addClass('shrunkheader');
		$('.loader').show();	
			$('#dropdown option[value=selction').remove();// this removes the selection option from the html dom thing
			$("#dropdown").heapbox("update"); //Updates heapbox to fit the change i just made to the selection it is based on the html dom and effect the dom dom
			let input = $('select').val()
			let url = 'https://api.nytimes.com/svc/topstories/v2/'+input+'.json';
			$('.article-section').empty();
			$('.article-wrapper').hide();
			url += '?' + $.param({
				'api-key': "2cee7ea7b62f4e7d83a741c409dae5e4"
			});
			$.ajax({
				url: url,
				method: 'GET',
			})

			.done((data)=>{

				let filteredstory = [];
			// the filter function here lets it dig through the array and keep only the hinted ones and put that into the letrible filteredstory
			filteredstory = $(data.results).filter(function(key,value){
				return $(value.multimedia).length>=5;
				// it "returns" back only ones that fulfill that requirement
			})
			filteredstory.splice (12);
			// this i over thought so much it just cuts out everything past the 12th one
// (key,value) 
			let articleinsertion = ""
			for(const{url,multimedia,abstract} of filteredstory){

				articleinsertion += 
				`<li>
					<a href="${url}">
				 		<div class=article style="background-image:url(${multimedia[4].url}">
							<div class="abstractpart"> 
								<div class="gradient"> 
									<p> ${abstract}</p>
								</div>
							</div>
						</div>
					</a>
				</li>`;
				

				
			}
			$('.article-section').append(articleinsertion);
			$('.article-wrapper').slideDown(1000)

		})

			.always(()=>{
				$('.loader').hide();	
			});

		}
	});
});	
