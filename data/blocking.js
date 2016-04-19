function ruleChecker(rule){
	var now = moment().format('HH:mm');
	var today = moment().format('dddd');
	var start_time = moment(rule.starting_time, "HH:mm").format("HH:mm");
	var end_time = moment(rule.ending_time, "HH:mm").format("HH:mm");
	var days_of_week = rule.days_of_week;
	if (now > start_time && now < end_time && days_of_week.indexOf(today) != -1){
		console.log("yoo");
		return true;
	}
	return false;
}


self.port.on("url", function(array){
	var url = array[0];
	console.log(url);
	var blacklist = array[1];
	console.log(blacklist);
	var rules = array[2];
	rules.forEach(function(rule){
		var check = ruleChecker(rule);
		if (check && blacklist.indexOf(url) != -1){
			self.port.emit('block');
		}
	});


});
