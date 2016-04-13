module.exports = {
	storage_check: function(url, array){
		if (array.indexOf(url) != -1){
			return true;
		}
		return false;
	}
	
}