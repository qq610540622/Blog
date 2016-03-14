/**
 * Created by Administrator on 2016-02-22.
 */

var daoBase = require('./base');
var commentModel = require('./../models').comment;

var dao = {};
var commentDao = new daoBase(commentModel);
dao.base = commentDao;
dao.model = commentModel;

dao.getCommentCount = function(callback) {
    var query = this.model.find({parentId:"0"},{_id:1}).count();
    query.exec(function(err,data) {
        if(err) callback(err,null);
        else callback(null,data);
    });
}

module.exports = dao;


