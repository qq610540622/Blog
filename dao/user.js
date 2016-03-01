/**
 * Created by Administrator on 2016-01-28.
 */

var daoBase = require('./base');
var usersModel = require('./../models').user;

var dao = {};
var userDao = new daoBase(usersModel);

dao.base = userDao;
dao.model = usersModel;

/**
 * 获取用户总数
 * @param callback
 */
dao.getUserCount = function(callback) {
    var query = this.model.find({},{_id:1}).count();
    query.exec(function(err,result) {
        if(err) callback(err,null);
        else callback(null,result);
    })
}

module.exports = dao;



