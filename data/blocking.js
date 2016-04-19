self.port.on("block", function(rules){
	var rules = rules;
	if (rules.length !== 0){
		var start_time = moment(rules.starting_time, "HH:mm").format();
		var end_time = moment(rules.ending_time, "HH:mm").format();
		var now  = moment().format();
		if (now > start_time && now < end_time){
			document.body.innerHTML = '<h1>You need to be working right now....</h1>'
		}
	}
/*	for (var i = 0; i < rules_objects.length; i++){]);
		if (rules_objects[i] != ""){
			var rule = JSON.parse(rules_objects[i]);
			rules.push(rule);
		}
	}    TODO: This is for when the day of the week is working*/


});
