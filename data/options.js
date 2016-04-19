var blacklist;
var rules;

self.port.on("show", function(array){
	blacklist = array[0];
	rules = JSON.parse(array[1]);
	blacklist.forEach(function(url){
		if (url[url.length - 1] != "*"){
			$('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" id="'+url+'"><span aria-hidden="true">&times;</span></button>'+ url +'</div>').insertBefore('#add');
		}
	});
	$("#rules").append('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" id="rule" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Rule #1</strong> Starting Time: ' + rules.starting_time + '; Ending Time: '+ rules.ending_time+'</div>');
	$(".close").on("click", function(){
		var temp = [];
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
		self.port.emit("blacklist_change", blacklist);
	});
	$("#block").click(function() {
		console.log("yo");
		var site = $("#site").val();
		console.log(site);
		// self.port.emit("website-block", )
	});
});



self.port.on("hide", function(){
	$("#blacklist").empty();
	$("#rules").empty();
})