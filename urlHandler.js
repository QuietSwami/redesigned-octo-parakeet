var exports = module.exports = {};

exports.domainName = function(url){
	var fields = url;
	fields = fields.replace("//", ".").replace("/", ".").replace(":", ".").split(".");
	return fields[3];
}