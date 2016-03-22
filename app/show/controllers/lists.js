/**
 * Created by Administrator on 2016-02-16.
 */

var articleDao = require("./../../../dao/article");
var pagination = require("./../../../common/pagination");
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
            articleDao.base.getList(page,size,where,{createDate:-1},function(err,result) {
                if(!err) {
                    var cheerio = require("cheerio");
                    if(result.rows && result.rows.length>0) {
                        for(var key in result.rows) {
                            var content = "<div id='wrap'>"+result.rows[key].content+"</div>";
                            var $ = cheerio.load(content,{decodeEntities: false});
                            var txt = $("#wrap").text();
                            result.rows[key].content = txt.substr(0,200);
                        }
                    }
                    var p = new pagination(forumId,keywords,page,size,"/show/lists",result);
                    callback(null,p);
                }
            });
        },
        hotArticles: function(callback){    //热门文章
            articleDao.getHotArticles(function(err,result) {
                if(err) callback(err,null);
                else callback(null,result);
            });
        },
        newArticles: function(callback){
            articleDao.getNewArticles(function(err,result) {
                if(err) callback(err,null);
                else callback(null,result);
            });
        },
        tags: function(callback){   //tag标签
            articleDao.getTagArticles(function(err,result) {
                if(err) {
                    callback(err, null);
                } else {
                    var distint = {};
                    result.forEach(function(item) {
                        item.tag.forEach(function(it) {
                            distint[it] = it;
                        })
                    })
                    var tempArray = [];
                    for(var key in distint) {
                        tempArray.push(key);
                    }
                    callback(null,tempArray);
                }
            })
        }
    },function(err, results) {
        if(err) res.render("error");
        else res.render("lists",{pageData:results,title:"列表页"});
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
                articleDao.getListByTag(page,size,keywords,function(err,data) {
                    if(err) callback(err,null);
                    else {
                        var cheerio = require("cheerio");
                        for(var index in data.rows) {
                            var content = "<div id='wrap'>"+data.rows[index].content+"</div>";
                            var $ = cheerio.load(content,{decodeEntities: false});
                            var txt = $("#wrap").text();
                            data.rows[index].content = txt.substr(0,200);
                        }

                        var p = new pagination("",keywords,page,size,"/show/lists",data);
                        callback(null,p);
                    }
                });
            },
            hotArticles: function(callback){    //热门文章
                articleDao.getHotArticles(function(err,items) {
                    if(err) callback(err,null);
                    else callback(null,items);
                });
            },
            newArticles: function(callback){    //最新文章
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
            if(err) res.render("error");
            else res.render("lists",{pageData:results,title:"列表页"});
        });
    }
}

module.exports = controller;
