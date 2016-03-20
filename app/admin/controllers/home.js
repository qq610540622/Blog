/**
 * Created by Administrator on 2016-01-31.
 */

var userDao = require("./../../../dao/user");
var commonHelper = require("./../../../helper/commonHelper");
var controller = {};

/**
 * 注册首页
 * @param req
 * @param res
 */
controller.index = function(req,res) {
    res.render("home",{"titlle":"注册"});
}


/**
 * 登录页面
 * @param req
 * @param res
 */
controller.login = function(req,res) {
    res.render("login");
}


/**
 * 检查是否存在超级管理员帐号
 * @param req
 * @param res
 */
controller.isExistAdmin = function(req,res) {
    userDao.base.getSingleByQuery({type:1},function(err,result) {
        res.send(result?"success":"error");
    })
}


/**
 * 后台登录验证码
 * @param req
 * @param res
 */
controller.captcha = function(req,res) {
    var width=!isNaN(parseInt(req.query.width))?parseInt(req.query.width):100;
    var height=!isNaN(parseInt(req.query.height))?parseInt(req.query.height):30;
    var code = parseInt(Math.random()*9000+1000);
    var imgbase64 = commonHelper.captcha(width,height,code);

    req.session.adminCaptcha = code;
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}





/**
 * 登录后台
 * @param req
 * @param res
 */
controller.submit = function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var captcha = req.body.captcha;
    var type = req.body.type;

    if(type == 1) {     //注册管事员帐号
        var async = require("async");
        async.waterfall([
            function(callback) {
                //检查是否真的没有管理员帐事情
                userDao.base.getSingleByQuery({type:1},function(err,result) {
                    if(result) callback(null,false);
                    else callback(null,true)
                })
            },
            function(arg,callback) {
                //检查没有管理员帐号就插入当前数据为管理员帐号
                if(arg) {
                    var model = {username:username,password:commonHelper.md5(password),type:type,status:0};
                    userDao.base.create(model,function(status,data) {
                        callback(null,true);
                    })
                }
            }
        ],function(err,result) {
            if(err) res.send("error");
            else {
                var roleDao = require("../../../dao/role");
                var permissionDao = require("../../../dao/permission");
                var permissions = [{permissionName : "评论",permissionCode : "/comment/submitComment"},{permissionName : "回复评论",permissionCode : "/comment/submitReplyComment"},{permissionName :"留言",permissionCode : "/guestbook/submit"},{permissionName : "回复留言",permissionCode : "/guestbook/submitReply"}];
                permissionDao.base.create(permissions,function(err,model) {});
                var temp = [];
                permissions.forEach(function(item) {
                    temp.push(item.permissionCode);
                })
                roleDao.base.create({roleName:"默认用户",roleCode:"default",users:[],permissions:temp},function(err,model) {});
                req.session.adminName = username;
                res.send("success");
            }
        });
    } else {    //登录
        var session_captcha = req.session.adminCaptcha;
        if(captcha == session_captcha) {
            userDao.base.getSingleByQuery({username:username,password:commonHelper.md5(password),type:1},function(err,result) {
                if(err) res.send("error");
                else {req.session.adminName = username; res.send("success");}
            })
        } else {
            res.send("error");
        }
    }
}


module.exports = controller;
