/**
 * Created by Administrator on 2016/3/16.
 */



var rbacDao = require("./../../../dao/rbac");
var controller = {};


controller.index = function(req,res) {
    res.render("rbac");
}
var iconv = require('iconv-lite');
controller.list = function(req,res) {
    rbacDao.base.getAll(function(err,items) {
        if(err) res.send("");
        else {
            res.json(items);
        };
    });
}


/**
 * ���
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
