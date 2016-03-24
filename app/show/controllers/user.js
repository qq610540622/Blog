/**
 * Created by Administrator on 2016-02-23.
 */

var async = require("async");
var userDao = require("./../../../dao/user");
var tools = require("./../../../common/tools");
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
controller.signin = function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username && password) {
        var model = {username:username,password:tools.md5(password)};
        userDao.base.getSingleByQuery(model,function(err,result) {
            if(err) {
                res.send({status:"error"});
            }else {
                if(result && result._id) {
                    //如果登录成功就把它的存放cookie和session中
                    req.session.userModel = result;
                    res.send({status:"success",data:result});
                } else {
                    res.send({status:"error"});
                }
            }
        })
    }
}


/**
 * 注册
 * @param req
 * @param res
 */
controller.signup = function(req,res) {
    var sessionCaptcha = req.session.captcha;
    var userIptCaptcha = req.body.captcha;

    if(sessionCaptcha == userIptCaptcha) {
        var username = req.body.username;
        var password = req.body.password;
        if(username && password) {
            var model = {username:username,password:tools.md5(password),icon:tools.random(1,64)};
            userDao.base.create(model,function(err,result) {
                if(err) {
                    res.send({status:"error"});
                }else {
                    //如果登录成功就把它的存放cookie和session中
                    req.session.userModel = model;

                    var roleDao = require("./../../../dao/role");
                    roleDao.base.update({roleCode:"default"},{$addToSet:{users:username}},{multi:false,upset:false},function(err) {
                        if(err) res.send({status:"error"});
                        else res.send({status:"success",data:result});
                    });
                }
            })
        }
    } else {
        res.send("captchaError");
    }
}


controller.signout = function(req,res) {
    try {
        delete req.session.userModel;
        res.send("success");
    } catch(e) {
        res.send("error");
    }
}


/**
 * 验证码
 * @param req
 * @param res
 */
controller.captcha = function(req,res) {
    var tools = require("./../../../common/tools");
    var width=!isNaN(parseInt(req.query.width))?parseInt(req.query.width):100;
    var height=!isNaN(parseInt(req.query.height))?parseInt(req.query.height):30;
    var code = parseInt(Math.random()*9000+1000);
    var imgbase64 = tools.captcha(width,height,code);
    req.session.captcha = code;
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    return;
}


module.exports = controller;
