/**
 * Created by Administrator on 2016/3/16.
 */



var roleDao = require("./../../../dao/role");
var permissionDao = require("./../../../dao/permission");
var controller = {};

controller.index = function(req,res) {
    res.render("roleIndex");
}

/**
 * 删除
 * @param req
 * @param res
 */
controller.remove = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        roleDao.base.remove({_id:_id},function(err) {
            res.send(err ? "error" : "success");
        });
    } else {
        res.send("error");
    }
}


/**
 * 获取角色集合
 * @param req
 * @param res
 */
controller.list = function(req,res) {
    roleDao.base.getList(function(err,items) {
        res.send(err ? "error" : items);
    });
}

/**
 * 角色操作(添加，修改)
 * @param req
 * @param res
 */
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


controller.update = function(req,res) {

    var _id = req.body._id;
    var users = req.body.users?JSON.parse(req.body.users):[];
    var permissions = req.body.permissions?JSON.parse(req.body.permissions):[];

    if(_id) {
        roleDao.base.update({_id:_id},{$set:{users:users,permissions:permissions}},{multi:false,upset:false},function(err) {
            res.send(err?"error":"success");
        });
    } else {
        res.send("error");
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
        });
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
