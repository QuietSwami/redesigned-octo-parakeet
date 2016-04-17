var blacklist;
var rules;

self.port.on("show", function(array){
	blacklist = array[0];
	rules = JSON.parse(array[1]);
	blacklist.forEach(function(url){
		if (url[url.length - 1] != "*"){
			$("#blacklist").append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" id="'+url+'"><span aria-hidden="true">&times;</span></button>'+ url +'</div>')
		}
	});
	$("#rules").append('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Rule #1</strong> Starting Time: ' + rules.starting_time + '; Ending Time: '+ rules.ending_time+'</div>');
});

$("#blacklist").on("click", function(){
	console.log("aqui");
	console.log($(this).children('div'));
	/*console.log("aqui");
	var id = $this.id;
	var temp = [];
	blacklist.forEach(function(url){
		if (url != id){
			temp.push(url);
		}
	});
	console.log(temp);
	blacklist = temp;
	self.port.emit("blacklist_change", blacklist);*/
});


self.port.on("hide", function(){
	$("#blacklist").empty();
	$("#rules").empty();
})