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


})