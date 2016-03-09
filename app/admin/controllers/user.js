/**
 * Created by Administrator on 2016-01-28.
 */



var userDao = require("./../../../dao/user");
var path = require('path');

var controller = {};


/**
 * 用户主页
 * @param req
 * @param res
 */
controller.index = function(req,res) {
    res.render("userIndex");
}


/**
 * 获取所有的用户
 * @param req
 * @param res
 */
controller.getList = function(req,res) {
    var where = {};
    var keywords = req.body.keywords;
    if(keywords) {
        var reg = new RegExp("^.*"+keywords+".*$","i");
        where.username = reg;
    }
    where.type = 0;
    userDao.base.getList(1,10,where,function(status,results) {
        if(status) {
            res.send(results);
        }
    });
}


/**
 * 用户操作视图
 * @param req
 * @param res
 */
controller.userOperate = function(req,res) {
    var _id = req.query._id;
    if(_id) {
        userDao.base.getById(_id,function(err,result) {
            if(err) res.render("error");
            else res.render("userOperate",{model:result});
        });
    }
}


/**
 * 更新
 * @param req
 * @param res
 */
controller.update = function(req,res) {
    var _id = req.body._id;
    var status = req.body.status;
    if(_id) {
        userDao.base.update({_id:_id},{$set:{status:status}},{upset:false,multi:false},function(err) {
            res.send(err == null ? "success" : "error");
        });
    }
}


/**
 * 删除
 * @param req
 * @param res
 */
controller.remove = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        userDao.base.remove({_id:_id},function(err) {
            res.send(err == null ? "success" : "error");
        });
    }
}



module.exports = controller;

