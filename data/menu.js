$(document).ready(function($) {
	$("#options").click(function(){
		self.port.emit("options");
	});
	$("#quick-add").click(function(){
		self.port.emit("quick-add");
	});
});