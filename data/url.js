module.exports = {
	url_decomposer: function(url){
		var decomposed = url.replace("//", " ").replace("/", " ").replace("www.", " ").split(" ");
		return decomposed; 
	}
}