


var cache = require("../../../common/cache");
var tools = require("../../../common/tools");
var userDao = require("../../../dao/user");
var controller = {};
controller.index = function(req,res) {
    res.render("chat",{title:"聊天室"});
}


controller.login = function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username && password) {
        var model = {username:username,password:tools.md5(password)};
        userDao.base.getSingleByQuery(model,function(err,result) {
            if(err) res.send({status:"error"});
            else {
                if(result && result._id) {
                    cache.put(result._id,result);
                    console.log(cache);
                    res.send({status:"success",data:result});
                } else {
                    res.send({status:"error"});
                }
            }
        })
    }
}


module.exports = controller;
