module.exports = {
	deconstructor: function(url){
		var d = url.replace("://", " ").replace("/", " ").split(" ");
		var ret = d[0] + "://" + d[1] + "/";
		return ret;

	},
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