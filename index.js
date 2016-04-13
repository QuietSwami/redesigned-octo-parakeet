var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var data = require("sdk/self").data;
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var file = require("sdk/io/file");
var storage = require(data.url("storage.js"));
var time = require(data.url("hour.js"));
var rules_path = data.url("rules.txt");
var blacklist_path = data.url("blacklist.txt");

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});


var panel = panels.Panel({
  width: 1080,
  contentURL: data.url("options.html"),
  contentScriptFile: [data.url("jquery.js"), data.url("bootstrap.min.js")],
  contentStyleFile: [data.url("bootstrap.min.css"), data.url("home.css")],
  onHide: handleHide
});


function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}


function handleHide() {
	button.state('window', {checked: false});
}


function read_file(path){
	var text = null;
	if (file.exists(path)) {
		var TextReader = file.open(path, "r");
		if (! TextReader.closed){
			text = TextReader.read();
			TextReader.close();
		}
	}
	return text;
}

function write_file(path, text){
	if (file.exists(path)){
		var TextReader = file.open(path, "w");
		if (! TextReader.closed){
			TextReader.write(text);
			TextReader.close();
		}
	}
}