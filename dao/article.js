/**
 * Created by Administrator on 2016-01-28.
 */

var daoBase = require('./base');
var articleModel = require('./../models').article;

var dao = {};
var articleDao = new daoBase(articleModel);
dao.base = articleDao;
dao.model = articleModel;

/**
 * 获取所有文章并按时间来排序
 * @param size
 * @param callback
 */
dao.getArticles = function(size,callback) {
    var query = this.model.find().sort({createDate:1});
    query.limit(size);
    query.exec(function(err,rs) {
        if(err) callback(err,null);
        else callback(null,rs);
    });
}


/**
 * 按标签来获取文章(带分页的数据)
 * @param page
 * @param size
 * @param tag
 * @param callback
 */
dao.getListByTag = function(page,size,tag,callback) {
    //拼接where条件
    var where = {};
    if (tag) {
        where.tag = {$in:[tag]};
    }
    var query = this.model.find(where);
    query.skip(size*(page-1));
    query.limit(size);
    var _this = this.model;

    query.exec(function(err,rs) {
        if(err) {
            return callback(false,err);
        } else {
            _this.find(where,function(err,res) {
                jsonArray = {total:res.length,rows:rs};
                return callback(true,jsonArray);
            })
        }
    });
}

/**
 * 热门文章
 * @param callback
 */
dao.getHotArticles = function(callback) {
    var query = this.model.find({},{title:1,_id:1}).limit(8).sort({readCount:1});
    query.exec(function(err,items) {
        if(err) callback(err,null);
        else callback(null,items);
    })
}

/**
 * 最近文章
 * @param callback
 */
dao.getNewArticles = function(callback) {
    var query = this.model.find({},{title:1,_id:1}).limit(8).sort({createDate:1});
    query.exec(function(err,items) {
        if(err) callback(err,null);
        else callback(null,items);
    })
}

/**
 * Tag标签
 * @param callback
 */
dao.getTagArticles = function(callback) {
    var query = this.model.find({},{tag:1,_id:0});
    query.exec(function(err,items) {
        if(err) callback(err,null);
        else callback(null,items);
    })
}

/**
 * 获取文章并更新阅读数量
 * @param articleId
 * @param callback
 */
dao.getArticleAndUpdateReadCount = function(articleId,callback) {
    _self = this;
    if(articleId) {
        var async = require("async");
        async.waterfall([
            function(callback){
                _self.base.update({_id:articleId},{$inc:{readCount:1}},{upsert:false,multi:false},function(err) {
                    if(err == null) callback(null,err);
                })
            },
            function(arg, callback){
                if(arg==null) {
                    _self.base.getById(articleId,function(err,data) {
                        callback(err,data);
                    });
                }
            }
        ], function (err, result) {
            callback(err,result);
        });
    }
}


/**
 * 获取文章的字段
 * @param fields
 * @param callback
 */
dao.getArticleFields = function(fields,callback) {
    var query = this.model.find({},fields);
    query.exec(function(err,res) {
        if(err) callback(err,null);
        else {
            callback(null,res);
        }
    })
}


module.exports = dao;