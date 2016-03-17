/**
 * Created by Administrator on 2016/3/16.
 */



var rbacDao = require("./../../../dao/rbac");
var controller = {};

controller.index = function(req,res) {
    res.render("rbac");
}
controller.list = function(req,res) {
    rbacDao.base.getAll(function(err,items) {
        if(err) res.send("");
        else {
            res.json(items);
        };
    });
}


controller.getUsers = function(req,res) {
    var roleName = req.body.roleName;
    if(roleName) {
        rbacDao.base.getSingleByQuery({roleName:roleName},function(err,result) {
            console.log(result);
            if(err) res.send("error");
            else {
                res.json(result.users);
            }
        })
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
        rbacDao.base.getSingleByQuery({_id:_id},function(err,result) {
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
                    rbacDao.base.update({_id:_id},{users:newUsers},{multi:false,upset:false},function(err) {
                        res.send(err==null?"success":"error");
                    });
                } else {
                    res.send("success");
                }
            }
        })
    }
}


controller.removeUsers = function(req,res) {
    var users = req.body.users;
    var _id = req.body._id;
    if(users) {
        rbacDao.base.getSingleByQuery({_id:_id},function(err,result) {
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

                rbacDao.base.update({_id:_id},{users:afterUsers},{multi:false,upset:false},function(err) {
                    res.send(err==null?"success":"error");
                });
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
    var model = {
        roleName:"游客",
        permissions:["a","b"],
        users:["c","d"]
    };
    rbacDao.base.create(model,function(status,result) {
        res.send(status?"success":"error");
    });
};

controller.delete = function(req,res) {

};

controller.update = function(req,res) {

}




module.exports = controller;
