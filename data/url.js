module.exports = {
	url_decomposer: function(url){
		var decomposed = url.replace("//", " ").replace("/", " ").replace("www.", " ").split(" ");
		return decomposed; 
	},
	url_multiplier: function(list){
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