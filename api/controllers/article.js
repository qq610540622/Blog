/**
 * Created by Administrator on 2016-03-10.
 */


var articleDao = require("./../../dao/article");
var path = require('path');
var controller = {};

controller.getSingle = function(id,callback) {
    return articleDao.base.getById(id,callback);
}

controller.getListById = function(ids,callback) {
    return articleDao.base.getListByQuery({_id:{$in:ids}},callback)
}


controller.getList = function(page,rows,where,callback) {
    return articleDao.base.getList(page,rows,where,function(status,items) {
        if(!status) callback("error",null);
        else callback(null,items);
    });
}


module.exports = controller;

