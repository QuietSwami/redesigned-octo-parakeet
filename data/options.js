var blacklist;
var rules;

self.port.on("show", function(array){
	blacklist = array[0];
	rules = JSON.parse(array[1]);
	blacklist.forEach(function(url){
		if (url[url.length - 1] != "*"){
<<<<<<< HEAD
			$('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" id="'+url+'"><span aria-hidden="true">&times;</span></button>'+ url +'</div>').insertBefore('#add');
=======
			$('#sites').append('<div id="site" class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" id="'+url+'"><span aria-hidden="true">&times;</span></button>'+ url +'</div>');
>>>>>>> 2733a999fe5ecae6aceabaad8c2e61a6a955e725
		}
	});
	$("#rules").append('<div id="rule" class="alert alert-success alert-dismissible" role="alert"><button type="button" id="rule" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Rule #1</strong> Starting Time: ' + rules.starting_time + '; Ending Time: '+ rules.ending_time+'</div>');
	$(".close").on("click", function(){
		var parent_id = $(this).closest("div").attr("id");
		if(parent_id === 'rule'){
			console.log('ruling you');
		}
		else if(parent_id === 'site'){
			console.log($(this).attr("id"));
			/*var temp = [];
			var id = $(this).attr('id');
			blacklist.forEach(function(url){
				if (url[url.length - 1] === "*"){
					if (url != id + "*"){
						temp.push(url);
					}
				}
				else{
					if(url != id){
						temp.push(url);
					}
				}

			});
			blacklist = temp;
			self.port.emit("blacklist_change", blacklist);*/
		}
		
	});
	$('#block').click(function(){
		var site = $("#site").val();
		if (val.length === 0){
			
		}
	});
	$("#block").click(function() {
		console.log("yo");
		var site = $("#site").val();
		console.log(site);
		// self.port.emit("website-block", )
	});
});



self.port.on("hide", function(){
	$("#sites").empty();
	$("#rules").empty();
})