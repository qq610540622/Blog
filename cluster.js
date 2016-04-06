

var cluster = require("cluster");
var os = require("os");

cluster.setupMaster({exec:"app.js"});

for(var i=0,cpus=os.cpus().length; i<cpus; i++) {
	
	cluster.fork();
	
}









