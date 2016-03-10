/**
 * Created by Administrator on 2016-03-10.
 */



var userDao = require("./../../dao/user");
var path = require('path');
var controller = {};

controller.getSingle = function(id,callback) {
    return userDao.base.getById(id,callback);
}

controller.getListById = function(ids,callback) {
    return userDao.base.getListByQuery({_id:{$in:ids}},callback)
}


controller.getList = function(page,rows,where,callback) {
    return userDao.base.getList(page,rows,where,function(status,items) {
        if(!status) callback("error",null);
        else callback(null,items);
    });
}

module.exports = controller;

