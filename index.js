var { ToggleButton } = require('sdk/ui/button/toggle');
var ss = require("sdk/simple-storage");
var panels = require("sdk/panel");
var data = require("sdk/self").data;
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var lib = require(data.url("lib.js"));

if (! ss.storage.blacklist){
  ss.storage.blacklist = ["https://www.facebook.com/"];
}

if (! ss.storage.rules){
  ss.storage.rules = [];
}


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
	include: ss.storage.blacklist,
  	contentScriptFile: [data.url("moment.js"), data.url("blocking.js")],
  	onAttach: function(worker){
  		worker.port.emit("block", ss.storage.rules);
  		worker.port.on("blocked", function(send){
  			console.log(send);
  		});
  	}
});

panel.on("show", function(){
  var blacklist = lib.multiplier(ss.storage.blacklist);
  var rules = ss.storage.rules;
  panel.port.emit("show", [blacklist, rules]);
});

panel.port.on("blacklist_change", function(blacklist){
  save_blacklist(blacklist);
});

panel.on("hide", function(){
  panel.port.emit("hide");
});

panel.on("get_rule", function(rule){
	//to hold what happens when a new rule is formed
});


function save_rules(rules){
  ss.storage.rules = rules;
}
function save_blacklist(blacklist){
  ss.storage.blacklist = blacklist;
}
