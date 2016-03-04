/**
 * Created by Administrator on 2016/3/3.
 */

var daoBase = require('./base');
var guestbookModel = require('./../models').guestbook;

var dao = {};
var guestbookDao = new daoBase(guestbookModel);
dao.base = guestbookDao;
dao.model = guestbookModel;

dao.getMessageCount = function(callback) {
    var query = this.model.find({parentId:"0"},{_id:1}).count();
    query.exec(function(err,result) {
        if(err) callback(err,null);
        else callback(null,result);
    });
}



dao.getList = function(page,size,where,callback) {
    //Æ´½ÓwhereÌõ¼þ
    var query = this.model.find(where);
    query.skip(size*(page-1));
    query.limit(size);
    var _this = this.model;
    query.exec(function(err,rs) {
        if(err) callback(err,null)
        else {
            if(rs && rs.length>0) {
                var parentIds = [];
                rs.forEach(function(i) {
                    parentIds.push(i._id);
                })
                _this.find({parentId:{$in:parentIds}},function(err,res){
                    rs = rs.concat(res);
                    callback(null,rs);
                });
            }
        }
    });
};


module.exports = dao;