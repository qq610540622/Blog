


var async = require("async");
var commentDao = require("./../../../dao/comment");
var tools = require("./../../../common/tools");
var session = require('express-session');
var controller = {};

/**
 * 获取所有的评论
 * @param req
 * @param res
 */
controller.getComments = function(req,res) {
    var articleId = req.body.articleId;
    if(articleId) {
        commentDao.base.getList({articleId:articleId,status:0},{commitTime:-1},function(err,data) {
            res.send(err?"error":data);
        });
    }
}

/**
 * 提交评论
 * @param req
 * @param res
 */
controller.submitComment = function(req,res) {
    var comment = req.body.comment;
    var articleId = req.body.articleId;
    if(comment&&articleId) {
        var model = {};
        model.content = comment;
        model.articleId = articleId;
        model.commitTime  = Date.now();
        model.username = req.session.userModel.username;
        model.supportCount = 0;
        model.icon = req.session.userModel.icon;
        model.status = 0;
        commentDao.base.create(model,function(err,data) {
            res.send(err?"error":"success");
        });
    }
}


/**
 * 提交回复评论
 * @param req
 * @param res
 */
controller.submitReplyComment = function(req,res) {
    var replyComment = req.body.replyComment;
    var _id = req.body._id;
    var articleId = req.body.articleId;

    if(replyComment&&articleId) {
        var model = {};
        model.content = replyComment;
        model.username = req.session.userModel.username;
        model.icon = req.session.userModel.icon;
        model.commitTime = Date.now();
        model.supportCount = 0;
        commentDao.base.update({_id:_id},{$addToSet:{reply:model}},{multi:false,upset:false},function(err) {
            res.send(err?err:"success");
        })
    }
}


/**
 * 支持
 * @param req
 * @param res
 */
controller.submitSupport = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        commentDao.base.update({_id:_id},{$inc:{supportCount:1}},{upsert:false,multi:false},function(err) {
            res.send(err?"error":"success");
        });
    }
}

module.exports = controller;