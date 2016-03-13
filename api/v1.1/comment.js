
/**
 * Created by Administrator on 2016-03-13.
 */

var commentDao = require("./../../dao/comment");
var common = require("./../../helper/commonHelper");
var path = require('path');
var controller = {};


/**
 * 获取单个或多个评论
 * ---------------------------
 * method：get
 * url:"http://localhost:3000/api/v1.1/comment/get?id=id1,id2"
 * 单个：　id='id1'
 * 多个：  id:'id1,id2,id3' 最多获取15条数据
 */
controller.get = function(req, res) {
    if (!req.query.id) common.resError(102, null, res);
    var id = req.query.id;
    if (id.indexOf(",") == -1) {    //单个id
        commentDao.base.getById(id, function(err, items) {
            if (err) common.resError(103, err, res);
            else common.resSuccess(items, res);
        });
    } else if(id.indexOf(",") > 1) {                        //多个id
        var ids = id.split(',');
        if(ids.length>15) resError(104,null,res);
        commentDao.base.getListByQuery({_id:{$in:ids}},function(err,items) {
            if (err) common.resError(105, err, res);
            else common.resSuccess(items, res);
        });
    }
};


/**
 *  获取评论列表
 * ---------------------------
 * method：get
 * url:"http://localhost:3000/api/v1.1/comment/list?page=1&rows=10"
 * page:当前页
 * rows:每页取多少条
 * @return total:总条数，rows:取出条数
 */
controller.list = function(req, res) {
    var page = req.query.page || 1;    //默认从第1页开查询
    var rows = req.query.rows || 5;    //默认值为5条数据

    if(page<0) common.resError(106,null,res);
    if(rows<0) common.resError(107,null,res);
    rows = rows > 15 ? 15 : rows;   //最多取出15条数据
    commentDao.base.getList(parseInt(page), parseInt(rows), null, function(status, items) {
        if(!status) common.resError(105,null,res);
        else common.resSuccess(items,res);
    });
};



/**
 * 删除
 * ---------------------------
 * method：post
 * url:"http://localhost:3000/api/v1.1/comment/remove"
 * 单个：　data:{id:'id1'}
 * 多个：  data:{id:'id1,id2,id3'} 最多删除15条数据
 */
controller.remove = function(req,res) {
    if (!req.body.id) common.resError(102, null, res);
    var id = req.body.id;
    if (id.indexOf(",") == -1) {    //单个id
        commentDao.base.remove({_id:id}, function(err) {
            if (err) common.resError(103, null, res);
            else common.resSuccess("", res);
        });
    } else if(id.indexOf(",") > 1) {                        //多个id
        var ids = id.split(',');
        if(ids.length>15) resError(104,null,res);
        commentDao.base.remove({_id:{$in:ids}},function(err) {
            if (err) common.resError(111, err, res);
            else common.resSuccess("", res);
        });
    }
}


module.exports = controller;