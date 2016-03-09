


var async = require("async");
var commentDao = require("./../../../dao/comment");
var dateHelper = require("./../../../helper/dateHelper");
var commonHelper = require("./../../../helper/commonHelper");
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
        commentDao.base.getListByQuery({articleId:articleId,status:0},function(err,data) {
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
        model.parentId = 0;
        model.username = req.session.username;
        model.commentTime  = Date.now();
        model.icon = req.session.userModel.icon;
        commentDao.base.create(model,function(status,data) {
            res.send(status?"error":"success");
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
    var parentId = req.body.parentId;
    var articleId = req.body.articleId;

    if(replyComment&&articleId) {
        var model = {};
        model.content = replyComment;
        model.articleId = articleId;
        model.parentId = parentId;
        model.username = req.session.username;
        model.commentTime  = Date.now();
        model.icon = req.session.userModel.icon;
        commentDao.base.create(model,function(status,data) {
            res.send(status?"error":"success");
        });
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