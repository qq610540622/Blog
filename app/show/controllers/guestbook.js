/**
 * Created by Administrator on 2016/3/1.
 */


var guestbookDao = require("./../../../dao/guestbook");
var async = require("async");
var controller = {};

/**
 * 留言板首页
 * @param req
 * @param res
 */
controller.index = function(req,res) {
    res.render("guestbook");
}


/**
 * 获取留言板消息
 * @param req
 * @param res
 */
controller.getMessages = function(req,res) {
    var page = req.query.page;
    page = page && page > 0 ? page : 1;
    var size = 10;

    async.series({
        rows:function(callback) {
            guestbookDao.getList(page,size,{parentId:0},function(err,result) {
                if(err) callback(err,null);
                else callback(null,result);
            });
        },
        total:function(callback) {
            guestbookDao.getMessageCount(function(err,result) {
                if(err) callback(err,null);
                else {
                    if(result && result>size) {
                        callback(null,Math.ceil(result/size));
                    } else {
                        callback(null,0);
                    }
                };
            })
        }
    },function(err,results) {
        res.send(results);
    })
}


/**
 * 保存留言信息
 * @param req
 * @param res
 */
controller.submit = function(req,res) {
    var content = req.body.content;
    var username = req.session.username;
    var icon = req.session.userModel.icon;
    if(content && username) {
        var model = {content:content,commitTime:Date.now(),parentId:0,username:username,supportCount:0,icon:icon,status:0};
        guestbookDao.base.create(model,function(status,result) {
            res.send(status?"success":"error");
        })
    } else {
        res.send("error");
    }
}


/**
 * 保存回复留言信息
 * @param req
 * @param res
 */
controller.submitReply = function(req,res) {
    var content = req.body.content;
    var username = req.session.username;
    var icon = req.session.userModel.icon;
    var parentId = req.body.parentId;
    if(content && username && parentId) {
        var model = {content:content,commitTime:Date.now(),parentId:parentId,username:username,supportCount:0,icon:icon,status:0};
        guestbookDao.base.create(model,function(status,result) {
            res.send(status?"success":"error");
        })
    } else {
        res.send("error");
    }
}

/**
 * 赞
 * @param req
 * @param res
 */
controller.submitSupport = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        guestbookDao.base.update({_id:_id},{$inc:{supportCount:1}},{upsert:false,multi:false},function(err) {
            res.send(err?"error":"success");
        });
    }
}


module.exports = controller;


