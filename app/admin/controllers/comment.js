/**
 * Created by Administrator on 2016-01-28.
 */


var commentDao = require("./../../../dao/comment");
var articleDao = require("./../../../dao/article");
var async = require("async");
var path = require('path');
var controller = {};


/**
 * 评论主页
 * @param req
 * @param res
 */
controller.index = function(req,res) {
    res.render("commentIndex");
}


/**
 * 获取集合
 * @param req
 * @param res
 */
controller.getCommentList = function(req,res) {
    
    var page = parseInt(req.body.page);
    var size = parseInt(req.body.rows);
    commentDao.base.getList(page,size,{status:0},{commitTime:-1},function(err,result) {
        if(err) res.send("error");
        else {
            res.send(result);
        }
    });
} 
 

/**
 * 删除
 * @param req
 * @param res
 */
controller.remove = function(req,res) {
    var _id = req.body._id;
    commentDao.base.update({_id:_id},{$set:{status:1}},{upset:false,multi:false},function(err) {
        res.send(err == null ? "success" : "error");
    });
}


module.exports = controller;
