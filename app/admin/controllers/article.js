/**
 * Created by Administrator on 2016-02-17.
 */


var articleDao = require("./../../../dao/article");
var stringHelper = require("./../../../helper/stringHelper");
var dateHelper = require("./../../../helper/dateHelper");
var path = require('path');

var controller = {};

//文章后台首页
controller.index = function(req,res) {
    res.render("articleIndex");
}


controller.operate = function(req,res) {
    var param = {};
    var operate = req.query.operate;
    if(operate == "create") {
        param.data = null;
        param.operate = "create";
        param.forumId = req.query.forumId;
        res.render("articleOperate",param);
    } else if(operate == "edit") {
        var _id = req.query._id;
        articleDao.base.getById(_id,function(err,data) {
            param.data = data;
            param.operate = "edit";
            res.render("articleOperate",param);
        });
    }
}


//集合
controller.list = function(req,res) {
    var page = parseInt(req.body.page);
    var size = parseInt(req.body.rows);
    var keywords = req.body.keywords;
    var forumId = req.body.forumId;

    var where = {};
    if (keywords) {
        var pattern = new RegExp("^.*"+keywords+".*$");
        where.title = pattern;
    }
    if(forumId) where.forumId = forumId;

    articleDao.base.getList(page,size,where,function(status,data) {
        if(status) {
            res.send(data);
        }
    })
};

//添加
controller.create = function(req,res) {
    var title = req.body.title;
    console.log(req.body.tag);
    if(title) {
        var model = {};
        model.title = title;
        model.forumId = req.body.forumId;
        model.tag = req.body.tag?req.body.tag.split(","):"";
        model.content = req.body.content;
        model.createDate= Date.now();
        model.readCount = 0;
        articleDao.base.create(model,function(status,data) {
            res.send(status?"success":data);
        });
    } else {
        res.send("error");
    }
};

//修改
controller.edit = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        var model = {};
        model.title = req.body.title;
        model.forumId = req.body.forumId;
        model.tag = req.body.tag?req.body.tag.split(","):"";
        model.content = req.body.content;
        articleDao.base.update({_id:_id},model,{multi:false},function(data) {
            res.send(data===null?"success":data);
        })
    } else {
        res.send("error");
    }
};


//删除
controller.remove = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        articleDao.base.remove({_id:_id},function(data) {
            res.send(data===null?"success":data);
        })
    }
};

//查找
controller.getTag = function(req,res) {
    articleDao.base.getByQuery({},{_id:0,tag:1},{multi:true},function(err,result) {
        res.send(err?"error":result);
    })
};

module.exports = controller;