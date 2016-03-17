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
controller.getList = function(req,res) {
    var page = parseInt(req.body.page);
    var size = parseInt(req.body.rows);

    async.waterfall([
        function(callback) {
            commentDao.base.getList(page,size,{status:0},function(status,result) {
                callback(null,result);
            });
        },
        function(arg,callback) {
            if(arg) {
                var _ids = [];
                if(arg.rows && arg.rows.length>0) {
                    arg.rows.forEach(function(item){
                        _ids.push(item.articleId);
                    });
                }
                var query = {_id:{$in:_ids}};
                articleDao.base.getByQuery(query,{title:1},{upset:false,multi:false},function(err,lists) {
                    if(err) {
                        callback(err,null);
                    } else {
                        var resultObj = {};
                        if(lists) {
                            for(var key in arg.rows) {
                                lists.forEach(function(i) {
                                    if(arg.rows[key].articleId == i._id) {
                                        arg.rows[key].articleId = i.title;
                                    }
                                });
                            }
                        }
                        callback(null,arg);
                    }
                });
            }
        }
    ],function(err,results) {
        res.send(err ? "error" : results);
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
