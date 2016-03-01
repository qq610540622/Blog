/**
 * Created by Administrator on 2016-01-31.
 */

var controller = {};

controller.index = function(req,res) {
    res.render("home",{"titlle":"注册"});
}

controller.login = function(req,res) {
    console.log("login page");
    res.render("login");
}


/**
 * 后台登录验证码
 * @param req
 * @param res
 */
controller.captcha = function(req,res) {

    console.log(req.cookies);

    var commonHelper = require("./../../../helper/commonHelper");
    var width=!isNaN(parseInt(req.query.width))?parseInt(req.query.width):100;
    var height=!isNaN(parseInt(req.query.height))?parseInt(req.query.height):30;
    var code = parseInt(Math.random()*9000+1000);
    var imgbase64 = commonHelper.captcha(width,height,code);

    req.session.admin_captcha = code;
    console.log(req.session.admin_captcha);
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}


controller.submit = function(req,res) {
    var userDao = require("./../../../dao/user");
    var username = req.body.username;
    var password = req.body.password;
    var captcha = req.body.captcha;
    var session_captcha = req.session.admin_captcha;

    console.log("submit");
    console.log(captcha + " , "+session_captcha);

    if(captcha == session_captcha) {
        userDao.base.getSingleByQuery({username:username,password:password,type:1},function(err,result) {
            if(result) res.send("success");
            else res.send("error");
        })
    } else {
        res.send("error");
    }
}


module.exports = controller;
