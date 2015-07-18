$(function(){
	$('.del').click(function(e){
		// alert('haha');
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-'+id);
		//alert(tr.length+':::'+id);
		
		$.ajax({
			type:'DELETE',
			url:'/admin/movie/list?id='+id
		})
		.done(function(results){
			if(results.success===1){
				if(tr.length > 0){
					tr.remove();
				}

			}
		});
	});

	$('#douban').blur(function(){
		// alert('haha');
		var douban = $(this);
		var id = douban.val();
		console.log(id);
		if(id){
			$.ajax({
				url:'https://api.douban.com/v2/movie/subject/'+id,
				cache:true,
				type:'get',
				dataType:'jsonp',
				crossDomain:true,
				jsonp:'callback',
				success:function(data){
					// console.log(data);
					$('#title').val(data.title);
					$('#director').val(data.directors[0].name);
					$('#year').val(data.year);
					$('#country').val(data.countries[0]);
					$('#poster').val(data.images.large);
					$('#summary').val(data.summary);
				}


			});

		}
	});

})