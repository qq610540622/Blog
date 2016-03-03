/**
 * Created by Administrator on 2016-02-17.
 */


var forumDao = require("./../../../dao/forum");
var path = require('path');
var controller = {};

//列表
controller.list = function(req,res) {
    forumDao.base.getListNotPagination(function(data) {
        if(data) {
            res.send(data);
        }
    })
};


//添加
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
            if(err === null) {
                result.data = data;
                result.operate = "edit";
                res.render("forumOperate",result);
            }
        });
    }
};


//添加
controller.create = function(req,res) {
    var model = {};
    if(req.body.name) {
        model.name = req.body.name;
        model.sortId = req.body.sortId;
        model.enabled = req.body.enabled;
        forumDao.base.create(model,function(status,data) {
            res.send(status ? "success" : data);
        })
    }
};


//删除
controller.remove = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        forumDao.base.remove({_id:_id},function(data) {
            res.send(data==null?"success":data);
        })
    }
};


//修改
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



//查找
controller.find = function(req,res) {};
//根据Id来查找
controller.findById = function(req,res) {};

module.exports = controller;