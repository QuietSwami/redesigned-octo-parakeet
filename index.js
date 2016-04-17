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

var blacklist = tab_url.url_multiplier(read_file(fspath.resolve(currDir, 'data/blacklist.txt')));
var rules = fspath.resolve(currDir, 'data/rules.txt');

var rules_objects = read_file(rules)[0];

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
  height: 600,
  contentURL: data.url("options.html"),
  contentScriptFile: [data.url("jquery.js"), data.url("bootstrap.min.js"), data.url("options.js")],
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
	include: blacklist,
  	contentScriptFile: [data.url("moment.js"), data.url("blocking.js")],
  	onAttach: function(worker){
  		worker.port.emit("block", rules_objects);
  		worker.port.on("blocked", function(send){
  			console.log(send);
  		});
  	}
});

panel.on("show", function(){
  panel.port.emit("show", [blacklist, rules_objects])
});

panel.on("hide", function(){
  panel.port.emit("hide");
});

panel.on("get_rule", function(rule){
	//to hold what happens when a new rule is formed
});


panel.on("get_blacklist", function(blacklist){
	//to hol what happens when a new site is added to the blacklist
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