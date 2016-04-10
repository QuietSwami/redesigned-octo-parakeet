var ss = require("sdk/simple-storage"); //require simple-storage

module.exports = {
	siteCheck: function(url){
		var site = ss.storage.list_sites;
		if (site.indexOf(url) != -1){
			return './impossible.html';
		}
	}
}