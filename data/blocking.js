
self.port.on("block", function(rules_objects){
	var rules = JSON.parse(rules_objects[0]);
/*	for (var i = 0; i < rules_objects.length; i++){]);
		if (rules_objects[i] != ""){
			var rule = JSON.parse(rules_objects[i]);
			rules.push(rule);
		}
	}    TODO: This is for when the day of the week is working*/
	var start_time = moment(rules.starting_time, "HH:mm").format();
	var end_time = moment(rules.ending_time, "HH:mm").format();
	var now  = moment().format();
	console.log(now.isBetween(start_time, end_time));

});
