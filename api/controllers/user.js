/**
 * Created by Administrator on 2016-03-10.
 */


var userDao = require("./../../dao/user");
var common = require("./../../helper/commonHelper");
var path = require('path');
var controller = {};


/**
 * 获取当个或多个文章
 * ---------------------------▶
 * method：get
 * url:"http://localhost:3000/api/v1.0/article/get?id=id1"
 * 单个：　id='id1'
 * 多个：  id:'id1,id2,id3' 最多获取15条数据
 */
controller.get = function(req, res) {
    if (!req.query.id) common.resError(102, null, res);
    var id = req.query.id;
    if (id.indexOf(",") == -1) {    //单个id
        userDao.base.getById(id, function(err, items) {
            if (err) common.resError(103, err, res);
            else common.resSuccess(items, res);
        });
    } else if(id.indexOf(",") > 1) {                        //多个id
        var ids = id.split(',');
        if(ids.length>15) resError(104,null,res);
        userDao.base.getListByQuery({_id:{$in:ids}},function(err,items) {
            if (err) common.resError(105, err, res);
            else common.resSuccess(items, res);
        });
    }
};


/**
 *  获取文章列表
 * ---------------------------
 * method：get
 * url:"http://localhost:3000/api/v1.0/article/list?page=1&rows=10"
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
    userDao.base.getList(parseInt(page), parseInt(rows), null, function(status, items) {
        if(!status) common.resError(105,null,res);
        else common.resSuccess(items,res);
    });
};



/**
 * 删除
 * ---------------------------
 * method：post
 * url:"http://localhost:3000/api/v1.0/article/remove"
 * 单个：　data:{id:'id1'}
 * 多个：  data:{id:'id1,id2,id3'} 最多删除15条数据
 */
controller.remove = function(req,res) {
    if (!req.body.id) common.resError(102, null, res);
    var id = req.body.id;
    if (id.indexOf(",") == -1) {    //单个id
        userDao.base.remove({_id:id}, function(err) {
            if (err) common.resError(103, null, res);
            else common.resSuccess(id, res);
        });
    } else if(id.indexOf(",") > 1) {                        //多个id
        var ids = id.split(',');
        if(ids.length>15) resError(104,null,res);
        userDao.base.remove({_id:{$in:ids}},function(err) {
            if (err) common.resError(111, err, res);
            else common.resSuccess("", res);
        });
    }
}


/**
 * 创建
 * ---------------------------
 * method：post
 * url:"http://localhost:3000/api/v1.0/article/create"
 * 单个：　data:{forumId:"*必填",title:"*必填",content:"可选",author:"可选",redirectUrl:"可选",tag:[可选],createDate:可选,readCount:可选}
 * 多个：  data:{list:数组} 最多删除15条数据
 */
controller.create = function(req,res) {
    if(req.body.forumId && req.body.title) {
        var model = {
            forumId : req.body.forumId,
            title : req.body.title,
            content : req.body.content || "",
            author : req.body.author || "",
            redirectUrl : req.body.redirectUrl || "",
            tag : req.body.tag || [],
            createDate : req.body.createDate || Date.now(),
            readCount:req.body.readCount || 0
        };
        userDao.base.create(model,function(status,item) {
            if(!status) common.resError(109,null,res);
            else common.resSuccess(item,res);
        });
    } else if(req.body.list) {
        var list = req.body.list;
        var isOk = true;
        for(var i=0,len=list.length; i<len; i++) {
            if(!list[i].forumId || !list[i].title) {
                isOk = false;
                break;
            }
        }
        if(isOk) {
            userDao.base.create(list,function(status,item) {
                if(!status) common.resError(109,null,res);
                else common.resSuccess(item,res);
            });
        } else {
            common.resError(110,null,res);
        }
    } else {
        common.resError(99,null,res);
    }
}



/**
 * 修改
 * ---------------------------
 * method：post
 * url:"http://localhost:3000/api/v1.0/article/update"
 * 单个：　data:{_id:"必填"forumId:"*必填",title:"*必填",content:"可选",author:"可选",redirectUrl:"可选",tag:[可选],createDate:可选,readCount:可选}
 * 多个：  data:{list:数组} 最多删除15条数据
 */
controller.update = function(req,res) {
    if(req.body._id && req.body.forumId && req.body.title) {
        var model = {
            _id : req.body._id,
            forumId : req.body.forumId,
            title : req.body.title,
            content : req.body.content || "",
            author : req.body.author || "",
            redirectUrl : req.body.redirectUrl || "",
            tag : req.body.tag || [],
            createDate : req.body.createDate || Date.now(),
            readCount:req.body.readCount || 0
        };
        userDao.base.update({_id:model._id}, model, {upsert:false, multi:false}, function(err) {
            if(err) common.resError(109,null,res);
            else common.resSuccess("",res);
        });
    } else if(req.body.list) {
        var list = req.body.list;
        if(list.length>15) common.resError(104,null,res);

        var isOk = true;
        for(var i=0,len=list.length; i<len; i++) {
            if(!list[i]._id || !list[i].forumId || !list[i].title) {
                isOk = false;
                break;
            }
        }

        if(isOk) {
            list.forEach(function(item) {
                userDao.base.update({_id:item._id}, item, {upsert:false, multi:false}, function(err) {});
            })
            common.resSuccess("",res);
        } else {
            common.resError(110,null,res);
        }
    } else {
        common.resError(99,null,res);
    }
}



module.exports = controller;

