module.exports = {
	objectivy: function(array){
		var rules = []
		array.forEach(function(entry){
			rules.push(JSON.parse(entry));
		});
		return rules;
	}
	stringify: function(array){
		var rules = ""
		array.forEach(function(entry){
			rules += JSON.stringify(entry) + "\n";
		});
		return rules;
	} 

}