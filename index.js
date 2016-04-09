var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var handler = require("./urlHandler.js");
var button = buttons.ActionButton({
	id: 'mozilla-link',
	label: 'Visit Mozilla',
	icon: {
		'16': './icon-16.png',
		'32': './icon-32.png',
		'64': './icon-64.png' 
	},
	onClick: handleClick
});

tabs.on('ready', function(tab) {
	var domain = handler.domainName(tab.url);
	console.log(domain);
});

function handleClick(state){
	tabs.open('./options.html');
}