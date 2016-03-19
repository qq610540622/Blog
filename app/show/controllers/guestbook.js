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
    res.render("guestbook",{title:"留言板"});
}

function descCommitTime(a,b) {
    return a.commitTime < b.commitTime;
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
    
    guestbookDao.base.getList(page,size,{},function(err,result) {
        if(err) res.send("error");
        else {
            if(result.rows && result.rows.length>0) {
                result.rows = result.rows.sort(descCommitTime);
            }
            res.send(err?"error":result);
        }
    });
}


/**
 * 保存留言信息
 * @param req
 * @param res
 */
controller.submit = function(req,res) {
    var content = req.body.content;
    var username = req.session.userModel.username;
    var icon = req.session.userModel.icon;
    if(content && username) {
        var model = {content:content,commitTime:Date.now(),username:username,supportCount:0,icon:icon,status:0,replay:[]};
        guestbookDao.base.create(model,function(err,result) {
            res.send(err?"error":"success");
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
    var username = req.session.userModel.username;
    var icon = req.session.userModel.icon;
    var _id = req.body._id;
    if(content && username && _id) {
        var replyModel = {content:content,username:username,icon:icon};
        guestbookDao.base.update({_id:_id},{$addToSet:{reply:replyModel}},function(err,result) {
            res.send(err?"error":"success");
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


