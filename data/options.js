var blacklist;
var rules;
$("#add_rule").click(function(){
	var starting_time = $("#start_hour").val() + ":" + $("#start_minutes").val();
	var ending_time = $("#ending_hour").val() + ":" + $("#ending_minutes").val();
	var days_of_week = []
	$("input[type=checkbox]").each(function(){
		if ($(this).prop('checked')){
			days_of_week.push($(this).val());
		}
	});
	self.port.emit('new_rule', {"starting_time":starting_time, "ending_time":ending_time, "days_of_week": days_of_week});
	location.reload();
});  	


self.port.on("show", function(array){
	blacklist = array[0];
	rules = array[1];
	blacklist.forEach(function(url){
		if (url[url.length - 1] != "*"){
			$('#sites').append('<div id="site" class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" id="'+url+'"><span aria-hidden="true">&times;</span></button>'+ url +'</div>');
		}
	});
	var counter=0;
	rules.forEach(function(rule){
		counter += 1;
		var days = "";
		rule.days_of_week.forEach(function(day){
			days+=day += ", ";
		});
		$("#rules").append('<div id="rule" class="alert alert-success alert-dismissible" role="alert"><button type="button" id="rule" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Rule #'+counter+'</strong> Starting Time: ' + rule.starting_time + '; Ending Time: '+ rule.ending_time+'; Days of week: '+ days+'</div>');
	});
	$(".close").on("click", function(){
		var parent_id = $(this).closest("div").attr("id");
		if(parent_id === 'rule'){
			
		}
		else if(parent_id === 'site'){
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
		}
		
	});
	$('#block').click(function(){
		var site = $("#to_add").val().replace(" ", "");
		if (site.length !== 0){
			blacklist.push(site);
			self.port.emit("blacklist_change", blacklist);
			$("#to_add").val(" ");
			$('#sites').append('<div id="site" class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" id="'+site+'"><span aria-hidden="true">&times;</span></button>'+ site +'</div>');

		}
	});

});