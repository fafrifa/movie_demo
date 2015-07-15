$(function(){
	$('.comment').click(function(e){
		var target = $(this);
		var toId = target.data('tid');
		var commentId = target.data('cid');
		// add hidden input to Post form
		
		if($('#toID').length>0){
			$('#toID').val(toId);

		}else{

			$('<input>').attr({
				type:'hidden',
				name:'comment[tid]',
				id:'toID',
				value:toId
			}).appendTo('#commentForm');
		}
		if($('#commentID').length>0){
			$('#commentID').val(commentId);
		}else{

			$('<input>').attr({
				type:'hidden',
				name:'comment[cid]',
				id:'commentID',
				value:commentId
			}).appendTo('#commentForm');
		}
	});

})