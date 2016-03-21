/**
 * Created by Administrator on 2016/3/16.
 */



var roleDao = require("./../../../dao/role");
var permissionDao = require("./../../../dao/permission");
var controller = {};

controller.index = function(req,res) {
    res.render("roleIndex");
}

controller.remove = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        roleDao.base.remove({_id:_id},function(err) {
            res.send(err?"error":"success");
        });
    } else {
        res.send("error");
    }
}

controller.list = function(req,res) {
    roleDao.base.getList(function(err,items) {
        if(err) res.send("");
        else {
            res.send(items);
        };
    });
}

controller.roleOperate = function(req,res) {
    var data = {};
    var operate = req.query.operate;
    if(operate == "create") {
        data.model = null;
        data.operate = "create";
        res.render("roleOperate",data);
    } else if(operate == "edit") {
        var _id = req.query._id;
        if(_id) {
            roleDao.base.getSingleByQuery({_id:_id},function(err,result) {
                data.model = result;
                data.operate = "edit";
                res.render("roleOperate",data);
            });
        } else {
            res.send("error");
        }
    }
}



/**
 * 获取角色下面的用户
 * @param req
 * @param res
 */
controller.getUsers = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        roleDao.base.getSingleByQuery({_id:_id},function(err,result) {
            if(err) res.send("error");
            else {
                res.json(result.users);
            }
        })
    } else {
        res.send("error");
    }
}


/**
 * 获取角色下面的权限
 * @param req
 * @param res
 */
controller.getPermissions = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        roleDao.base.getSingleByQuery({_id:_id},function(err,result) {
            if(err) res.send("error");
            else {
                permissionDao.base.getByQuery({permissionCode:{$in:result.permissions}},{},{multi:true,upset:false},function(err,results) {
                    res.json(results);
                });

            }
        });
    } else {
        res.send("error");
    }
}

/**
 * 角色下面添加用户
 * @param req
 * @param res
 */
controller.submitUsers = function(req,res) {
    var users = req.body.users;
    var _id = req.body._id;
    if(users) {
        roleDao.base.getSingleByQuery({_id:_id},function(err,result) {
            if(err) res.send("error");
            else {
                var usersObj = {};
                users.forEach(function(user) {
                    usersObj[user] = true;
                })
                var dbUsersObj = {};
                result.users.forEach(function(user) {
                    dbUsersObj[user] = true;
                })
                var uniq = [];//拿到没有重复的元素
                for(var key in usersObj) {
                    if(!dbUsersObj[key]) {
                        uniq.push(key);
                    }
                }

                if(uniq.length>0) {
                    var newUsers = result.users.concat(uniq);
                    roleDao.base.update({_id:_id},{users:newUsers},{multi:false,upset:false},function(err) {
                        res.send(err==null?"success":"error");
                    });
                } else {
                    res.send("success");
                }
            }
        })
    }
}


/**
 * 删除用户
 * @param req
 * @param res
 */
controller.removeUsers = function(req,res) {
    var users = req.body.users;
    var _id = req.body._id;
    if(users) {
        roleDao.base.getSingleByQuery({_id:_id},function(err,result) {
            if(err) res.send("error");
            else {
                var usersObj = {};
                users.forEach(function(user) {
                    usersObj[user] = true;
                });
                var dbUsersObj = {};
                result.users.forEach(function(user) {
                    dbUsersObj[user] = true;
                });

                var afterUsers = [];    //删除之后的
                for(var key in dbUsersObj) {
                    if(!usersObj[key]) {
                        afterUsers.push(key);
                    }
                }

                roleDao.base.update({_id:_id},{users:afterUsers},{multi:false,upset:false},function(err) {
                    res.send(err==null?"success":"error");
                });
            }
        })
    }
}


/**
 * 提交角色对应的权限
 * @param req
 * @param res
 */
controller.submitPermissions = function(req,res) {
    var _id = req.body._id;
    var permissions = req.body.permissions;

    if(_id && permissions) {
        roleDao.base.getSingleByQuery({_id:_id},function(err,result) {
            if(err) res.send("error");
            else {
                var permissionsObj = {};
                permissions.forEach(function(p) {
                    permissionsObj[p] = true;
                })
                var dbPermissionsObj = {};
                result.permissions.forEach(function(p) {
                    dbPermissionsObj[p] = true;
                })
                var uniq = [];//拿到没有重复的元素
                for(var key in permissionsObj) {
                    if(!dbPermissionsObj[key]) {
                        uniq.push(key);
                    }
                }

                if(uniq.length>0) {
                    var newPermissions = result.permissions.concat(uniq);
                    roleDao.base.update({_id:_id},{permissions:newPermissions},{multi:false,upset:false},function(err) {
                        res.send(err==null?"success":"error");
                    });
                } else {
                    res.send("success");
                }
            }
        });
    } else {
        res.send("error");
    }
}


controller.removePermissions = function(req,res) {

    var _id = req.body._id;
    var permissions = req.body.permissions;

    if(_id && permissions) {
        roleDao.base.getSingleByQuery({_id:_id},function(err,result) {
            if(err) res.send("error");
            else {
                var permissionsObj = {};
                permissions.forEach(function(p) {
                    permissionsObj[p] = true;
                });
                var dbPermissionsObj = {};
                result.permissions.forEach(function(p) {
                    dbPermissionsObj[p] = true;
                });

                var afterPermissions = [];    //删除之后的
                for(var key in dbPermissionsObj) {
                    if(!permissionsObj[key]) {
                        afterPermissions.push(key);
                    }
                }

                roleDao.base.update({_id:_id},{permissions:afterPermissions},{multi:false,upset:false},function(err) {
                    res.send(err==null?"success":"error");
                });
            }
        })
    }
}

/**
 * 检查是否有重复roleCode
 * @param req
 * @param res
 */
controller.isRepeatRoleCode = function(req,res) {
    var roleCode = req.body.roleCode;
    if(roleCode) {
        roleDao.base.getSingleByQuery({roleCode:roleCode},function(err,model) {
            console.log(model);
            if(err) res.send("error");
            else {
                if(model && model._id) res.send("success");
                else res.send("error");
            }
        })
    }
}


/**
 *
 * @param req
 * @param res
 */
controller.create = function(req,res) {
    var roleName = req.body.roleName;
    var roleCode = req.body.roleCode;
    if(roleName && roleCode) {
        var model = {
            roleName:roleName,
            roleCode:roleCode,
            users:[],
            permissions:[]
        }
        roleDao.base.create(model,function(err,result) {
            res.send(err?"error":"success");
        });
    }
};

controller.edit = function(req,res) {
    var _id = req.body._id;
    var roleName = req.body.roleName;
    var roleCode = req.body.roleCode;
    if(_id&&roleName) {
        var model = {
            roleName:roleName,
            users:[],
            permissions:[]
        };
        roleDao.base.update({_id:_id},{$set:{roleName:roleName,roleCode:roleCode}},{multi:false,upset:false},function(err) {
            res.send(err?"error":"success");
        })
    }
}

controller.delete = function(req,res) {

};




module.exports = controller;
