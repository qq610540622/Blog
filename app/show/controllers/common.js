
var roleDao = require("./../../../dao/role");
var permissionDao = require("./../../../dao/permission");
var async = require("async");

controller = {};
controller.hasPermission = function(req,res) {
    var url = req.body.url;
    //х╗оч
    if(req.session.userModel && url) {
        var username = req.session.userModel.username;

        async.series({
            permissions:function(callback) {
                permissionDao.base.getAll(function(err,results) {
                    if(err) callback(err,null);
                    else {
                        var obj = {};
                        results.forEach(function(item) {
                            obj[item.permissionCode] = item.permissionName;
                        })
                        callback(null,obj)
                    };
                })
            },
            userOwnPermissions:function(callback) {
                roleDao.base.getByQuery({users:username},{permissions:1},{multi:true,upset:false},function(err,results) {
                    var obj = {};
                    if(err) callback(err,null);
                    else {
                        results.forEach(function(items) {
                            if(items && items.permissions.length>0) {
                                for(var i=0, len=items.permissions.length; i<len; i++) {
                                    obj[items.permissions[i]] = true;
                                }
                            }
                        });
                        callback(null,obj);
                    }
                })
            }
        }, function (err, data) {
            if (data && data.permissions) {
                var isExist = false;
                var p = "";
                for (var key in data.permissions) {
                    if (url.indexOf(key) != -1) {
                        isExist = true;
                        p = key;
                        break;
                    }
                }
                if (isExist && (data.userOwnPermissions && !data.userOwnPermissions[p])) {
                    res.send("error");
                } else {
                    res.send("success");
                }
            } else {
                res.send("success");
            }
        });
    } else {
        res.send("success");
    }
}

module.exports = controller;
