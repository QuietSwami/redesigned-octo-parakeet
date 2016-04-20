var { ToggleButton } = require('sdk/ui/button/toggle');
var ss = require("sdk/simple-storage");
var panels = require("sdk/panel");
var data = require("sdk/self").data;
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var lib = require(data.url("lib.js"));


if (! ss.storage.blacklist){
  ss.storage.blacklist = [];
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
  contentStyleFile: data.url('menu.css'),
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

tabs.on('ready', function(tab){
  var blacklist = ss.storage.blacklist;
  for (i=0; i<blacklist.length; i++){
    console.log(blacklist[i]);
  }
  var worker = tab.attach({
    contentScriptFile: [data.url('moment.js'), data.url("blocking.js")]
  });
  worker.port.emit("url", [tab.url, ss.storage.blacklist, ss.storage.rules]);
  worker.port.on('block', function(){
    tab.url = data.url("blocked.html");
  }); 
});

panel.port.on("options", function(){
  tabs.open({
    url: data.url("options.html"),
    onOpen: function options(tab) {
      tab.on("pageshow", function(tab){
        var worker = tab.attach({
          contentScriptFile: [data.url("jquery.js"), data.url("bootstrap.min.js"),data.url("options.js")],
          contentStyleFile: [data.url("bootstrap.css"), data.url('home.css')]
        });
        worker.port.emit("show", [ss.storage.blacklist, ss.storage.rules]);
        worker.port.on("blacklist_change", function(blacklist){
          save_blacklist(blacklist);
        });
      });  
    }
  }); 
});

function save_rules(rules){
  ss.storage.rules = rules;
}

function save_blacklist(blacklist){
  ss.storage.blacklist = blacklist;
}
