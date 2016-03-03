/**
 * Created by Administrator on 2016-01-28.
 */

var daoBase = require('./base');
var forumModel = require('./../models').forum;

var dao = {};
var forumDao = new daoBase(forumModel);
dao.base = forumDao;
dao.model = forumModel;


/**
 * 获取所有模块，按序号排序
 * @param callback
 */
dao.getAll = function(callback) {
    var query = this.model.find({enabled:true}).sort({sortId:1});
    query.exec(function(err,results) {
        if(err) callback(err,null);
        else callback(null,results);
    });
}

module.exports = dao;

