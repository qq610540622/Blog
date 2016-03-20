/**
 * Created by Administrator on 2016-02-23.
 */

var async = require("async");
var userDao = require("./../../../dao/user");
var commonHelper = require("./../../../helper/commonHelper");
var controller = {};


/**
 * 是否登录
 * @param req
 * @param res
 */
controller.isLogin = function(req,res) {
    var userModel = req.session.userModel;
    var result = userModel && typeof userModel == "object" ? "success":"";
    res.send(result);
}


/**
 * 用户名是否存在
 * @param req
 * @param res
 */
controller.isExistUsername = function(req,res) {
    var username = req.body.username;
    if(username) {
        userDao.base.countByQuery({username:username},function(err,result) {
            if(result) {
                res.send("exist");
            } else {
                res.send("notExist");
            }
        });
    }
}


/**
 * 登录
 * @param req
 * @param res
 */
controller.login = function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username && password) {
        var model = {username:username,password:commonHelper.md5(password)};
        userDao.base.getSingleByQuery(model,function(err,result) {
            if(err) res.send("error");
            else {
                //如果登录成功就把它的存放cookie和session中
                req.session.userModel = result;
                res.send("success");
            }
        })
    }
}


/**
 * 注册
 * @param req
 * @param res
 */
controller.signin = function(req,res) {
    var sessionCaptcha = req.session.captcha;
    var userIptCaptcha = req.body.captcha;

    if(sessionCaptcha == userIptCaptcha) {
        var username = req.body.username;
        var password = req.body.password;
        if(username && password) {
            var model = {username:username,password:commonHelper.md5(password),icon:commonHelper.random(1,64)};
            userDao.base.create(model,function(err,result) {
                if(err) res.send("error");
                else {
                    //如果登录成功就把它的存放cookie和session中
                    req.session.userModel = model;
                    res.cookie["username"] = username;

                    var roleDao = require("./../../../dao/role");
                    roleDao.base.update({roleCode:"default"},{$addToSet:{users:username}},{multi:false,upset:false},function(err) {
                        if(err) res.send("error");
                        else res.send("success");
                    })
                }
            })
        }
    } else {
        res.send("captchaError");
    }
}

/**
 * 验证码
 * @param req
 * @param res
 */
controller.captcha = function(req,res) {
    var commonHelper = require("./../../../helper/commonHelper");
    var width=!isNaN(parseInt(req.query.width))?parseInt(req.query.width):100;
    var height=!isNaN(parseInt(req.query.height))?parseInt(req.query.height):30;
    var code = parseInt(Math.random()*9000+1000);
    var imgbase64 = commonHelper.captcha(width,height,code);
    req.session.captcha = code;
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    return;
}


module.exports = controller;
