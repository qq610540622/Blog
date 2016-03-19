
var roleDao = require("./../../../dao/role");
var permissionDao = require("./../../../dao/permission");
var async = require("async");

controller = {};
controller.hasPermission = function(req,res) {
    var url = req.body.url;
    if(req.session.userModel && url) {
        
    } else {
        res.send("success");
    }
}

module.exports = controller;
