var { ToggleButton } = require('sdk/ui/button/toggle');
var ss = require("sdk/simple-storage");
var panels = require("sdk/panel");
var data = require("sdk/self").data;
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var lib = require(data.url("lib.js"));


if (! ss.storage.blacklist){
  ss.storage.blacklist = ["http://www.record.xl.pt/"];
}

if (! ss.storage.rules){
  ss.storage.rules = [{"number":1, "starting_time": "7:00", "ending_time": "23:00", "days_of_week": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}];
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
  width: 180,
  height: 180,
  contentURL: data.url("menu.html"),
  contentScriptFile: [data.url("jquery.js"), data.url("bootstrap.min.js"), data.url("menu.js")],
  contentStyleFile: [data.url("bootstrap.min.css")],
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

function onOpen(tab) {
/*  console.log(tab.url + " is open");*/
  tab.on("pageshow", logShow);
/*  tab.on("activate", logActivate);
  tab.on("deactivate", logDeactivate);
  tab.on("close", logClose);*/ 
}

function logShow(tab) {
  var worker = tab.attach({
    contentScriptFile: [data.url('moment.js'), data.url("blocking.js")]
  });
  worker.port.emit("url", [tab.url, ss.storage.blacklist, ss.storage.rules]);
  worker.port.on('block', function(){
    tab.url = data.url("blocked.html");
  });

}

/*function logActivate(tab) {
  console.log(tab.url + " is activated");
}

function logDeactivate(tab) {
  console.log(tab.url + " is deactivated");
}

function logClose(tab) {
  console.log(tab.url + " is closed");
}*/

tabs.on('open', onOpen);


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
