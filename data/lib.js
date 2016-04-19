module.exports = {
	multiplier: function(list){
		var temp = [];
		list.forEach(function(url){
			if (url != ''){
				temp.push(url);
				temp.push(url+'*');
			}
		});
		return temp;
	}

}