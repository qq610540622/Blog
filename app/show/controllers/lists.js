/**
 * Created by Administrator on 2016-02-16.
 */

var articleDao = require("./../../../dao/article");
var paginationHelper = require("./../../../helper/paginationHelper");
var async = require("async");
var controller = {};

/**
 * 获取文章列表
 * @param req
 * @param res
 */
controller.lists = function(req,res) {
    var forumId = req.query.forumId?req.query.forumId:"";
    var page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    var size = 10;
    var keywords = req.query.keywords === undefined ? "" : req.query.keywords;


    async.series({
        listsArticles: function(callback){
            var where = {};
            if (keywords) {
                var pattern = new RegExp(".*"+keywords+".*",'i');
                where.title = pattern;
            }
            if(forumId) where.forumId = forumId;
            console.log(where);

            articleDao.base.getList(page,size,where,function(status,data) {
                console.log(data);
                if(status) {
                    var pagination = new paginationHelper(forumId,keywords,page,size,"/show/lists",data);
                    callback(null,pagination);
                }
            });
        },
        hotArticles: function(callback){    //热门文章
            articleDao.getHotArticles(function(err,items) {
                if(err) callback(err,null);
                else callback(null,items);
            });
        },
        newArticles: function(callback){
            articleDao.getNewArticles(function(err,items) {
                if(err) callback(err,null);
                else callback(null,items);
            });
        },
        tags: function(callback){   //tag标签
            articleDao.getTagArticles(function(err,items) {
                if(err) {
                    callback(err, null);
                } else {
                    var distint = {};
                    items.forEach(function(item) {
                        item.tag.forEach(function(it) {
                            distint[it] = it;
                        })
                    })
                    var result = [];
                    for(var key in distint) {
                        result.push(key);
                    }
                    callback(null,result);
                }
            })
        }
    },function(err, results) {
        if(!err){
            console.log(results);
            res.render("lists",{pageData:results});
        }
    });
}


/**
 * tag标签
 * @param req
 * @param res
 */
controller.tag = function(req,res) {
    var keywords = req.query.keywords;
    var page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    var size = 10;
    if(keywords) {

        async.series({
            listsArticles: function(callback){
                articleDao.getListByTag(page,size,keywords,function(status,data) {
                    if(status) {
                        var pagination = new paginationHelper("",keywords,page,size,"/show/lists",data);
                        callback(null,pagination);
                    }
                });
            },
            hotArticles: function(callback){    //热门文章
                articleDao.getHotArticles(function(err,items) {
                    if(err) callback(err,null);
                    else callback(null,items);
                });
            },
            newArticles: function(callback){
                articleDao.getNewArticles(function(err,items) {
                    if(err) callback(err,null);
                    else callback(null,items);
                });
            },
            tags: function(callback){   //tag标签
                articleDao.getTagArticles(function(err,items) {
                    if(err) {
                        callback(err, null);
                    } else {
                        var distint = {};
                        items.forEach(function(item) {
                            item.tag.forEach(function(it) {
                                distint[it] = it;
                            })
                        })
                        var result = [];
                        for(var key in distint) {
                            result.push(key);
                        }
                        callback(null,result);
                    }
                })
            }
        },function(err, results) {
            if(!err){
                console.log(results);
                res.render("lists",{pageData:results});
            }
        });



    }
}

module.exports = controller;
