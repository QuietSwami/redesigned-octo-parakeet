var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var data = require("sdk/self").data;
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var storage = require(data.url("storage.js"));
var time = require(data.url("hour.js"));
var tab_url = require(data.url("url.js"));

const fspath = require("sdk/fs/path");
const {Cc, Ci} = require("chrome");

const currDir = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIDirectoryServiceProvider).getFile("CurWorkD", {}).path;

var blacklist = read_file(fspath.resolve(currDir, 'data/blacklist.txt'));
var rules = fspath.resolve(currDir, 'data/rules.txt');

var rules_objects = read_file(rules);

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

pageMod.PageMod({
	include: "*",
  	contentScriptFile: [data.url("moment.js"), data.url("blocking.js")],
  	onAttach: function(worker){
  		worker.port.emit("block", rules_objects);
  		worker.port.on("blocked", function(send){
  			console.log(send);
  		})
  	}
});



function read_file(path){
	var text = null;
	var fileIO = require("sdk/io/file");
	if (fileIO.exists(path)) {
		var TextReader = fileIO.open(path, "r");
		if (! TextReader.closed){
			text = TextReader.read();
			TextReader.close();
		}
	}
	return text.split("\n");
}

function write_file(path, text){
	var fileIO = require("sdk/io/file");
	if (fileIO.exists(path)){
		var TextReader = fileIO.open(path, "w");
		if (! TextReader.closed){
			TextReader.write(text);
			TextReader.close();
		}
	}
}