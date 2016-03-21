/**
 * Created by Administrator on 2016-02-17.
 */


var forumDao = require("./../../../dao/forum");
var path = require('path');
var controller = {};

/**
 * 列表
 * @param req
 * @param res
 */
controller.list = function(req,res) {
    forumDao.base.getList(function(err, data) {
        res.send(err ? "error" : data);
    })
};


/**
 * 添加与更新视图
 * @param req
 * @param res
 */
controller.operate = function(req,res) {
    var operate = req.query.operate;
    var _id = req.query._id;
    var result = {};
    if(operate == "create") {
        result.data = null;
        result.operate = "create";
        res.render("forumOperate",result);
    } else if(operate == "edit") {
        forumDao.base.getById(_id,function(err,data) {
            if(err) res.rend("error");
            else {
                result.data = data;
                result.operate = "edit";
                res.render("forumOperate",result);
            }
        });
    }
};
function a () {
    if(1==true) {
        var test=3;
    }
}


/**
 * 添加
 * @param req
 * @param res
 */
controller.create = function(req,res) {
    var model = {};
    if(req.body.name) {
        model.name = req.body.name;
        model.sortId = req.body.sortId;
        model.enabled = req.body.enabled;
        forumDao.base.create(model,function(err,data) {
            res.send(err ? "err" : "success");
        })
    }
};


/**
 * 删除
 * @param req
 * @param res
 */
controller.remove = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        forumDao.base.remove({_id:_id},function(data) {
            res.send(data==null?"success":data);
        })
    }
};


/**
 * 修改
 * @param req
 * @param res
 */
controller.edit = function(req,res) {
    var model = {};
    if(req.body._id) {
        model.name = req.body.name;
        model.sortId = req.body.sortId;
        model.enabled = req.body.enabled;

        var query = {_id:req.body._id};
        var update = model;
        var options = { upsert: true }
        forumDao.base.update(query,update,options,function(data) {
            res.send(data==null?"success":data);
        })
    }
};

module.exports = controller;