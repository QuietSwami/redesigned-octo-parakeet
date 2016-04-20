$(document).ready(function($) {
	$("#options").click(function(){
		self.port.emit("options");
	})
});