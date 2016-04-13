module.exports = {
	is_time: function(start_secs, end_secs){
		var hour = new Date.now();
		if (hour >= start_secs && hour <= end_secs){
			return true;
		}
		return false;
	}
}