
var roleDao = require("./../dao/role");
var permissionDao = require("./../dao/permission");
var async = require("async");


exports.authPermission = function(req,res,next) {
    if(req.session.userModel) {
        var url = req.url;
        var username = req.session.userModel.username;
        async.series({
            permissions:function(callback) {
                permissionDao.base.getList(function(err,results) {
                    if(err) callback(err,null);
                    else {
                        var obj = {};
                        results.forEach(function(item) {
                            obj[item.permissionCode] = item.permissionName;
                        });
                        callback(null,obj)
                    };
                });
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
                });
            }
        }, function (err, data) {
            if (data && data.permissions) {
                var isExist = false;
                for (var key in data.permissions) {
                    if (url == key) {
                        isExist = true;
                        break;
                    }
                }
                if (isExist && (data.userOwnPermissions && !data.userOwnPermissions[url])) {
                    return res.send("notPermission");
                } else {
                    next();
                }
            } else {
                next();
            }
        });
    } else {
        next();
    }
}


