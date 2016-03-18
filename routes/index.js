/**
 * Created by Administrator on 2016-01-27.
 */

var showIndexController = require("../app/show/controllers/index");
var showDetailController = require("../app/show/controllers/detail");
var showListsController = require("../app/show/controllers/lists");
var showCommentController = require("../app/show/controllers/comment");
var showUserController = require("../app/show/controllers/user");
var showGuestbookController = require("../app/show/controllers/guestbook");


var adminIndexController = require("../app/admin/controllers/home");
var adminArticleController = require("../app/admin/controllers/article");
var adminUserController = require("../app/admin/controllers/user");
var adminForumController = require("../app/admin/controllers/forum");
var adminCommentController = require("../app/admin/controllers/comment");
var adminRoleController = require("../app/admin/controllers/role");
var adminPermissionController = require("../app/admin/controllers/permission");


var common = require("./../helper/commonHelper");
var EventProxy = require('eventproxy');
var roleDao = require("./../dao/role");
var permissionDao = require("./../dao/permission");
var async = require("async");
/**
 * 路由器类
 */
var route = function(app) {
    this.app = app;
    this.permissions = {};
    _this = this;
};

route.prototype = {
    constructor: route,
    run: function() {
      this.webRoute();
      this.apiRoute();
    },
    webRoute: function() {
        /* 拦截器 */
        this.app.use(function(req,res,next) {
            //后台登录
            if(req.url.indexOf("/admin") > 0) {
                if(!req.session.adminName) {
                    res.redirect("/login");
                    return;
                }
            }

            next();
            ////权限
            //if(req.session.userModel) {
            //    var username = req.session.userModel.username;
            //    var url = req.url;
            //
            //    async.series({
            //        permissions:function(callback) {
            //            permissionDao.base.getAll(function(err,results) {
            //                if(err) callback(err,null);
            //                else callback(null,results);
            //            })
            //        },
            //        userOwnPermissions:function(callback) {
            //            roleDao.base.getByQuery({users:username},{permissions:1},{multi:true,upset:false},function(err,results) {
            //                var obj = {};
            //                if(err) callback(err,null);
            //                else {
            //                    results.forEach(function(items) {
            //                        if(items && items.permissions.length>0) {
            //                            for(var i=0, len=items.permissions.length; i<len; i++) {
            //                                obj[items.permissions[i]] = true;
            //                            }
            //                        }
            //                    });
            //                    callback(null,obj);
            //                }
            //            })
            //        }
            //    },function(err,data) {
            //        var isOk = false;
            //        if(data && data.permissions) {
            //            data.permissions.forEach(function(item) {
            //                if(url.indexOf(item.permissionCode) != -1) {
            //                    if(data.userOwnPermissions[item.permissionCode]) {
            //                        isOk = true;
            //                    }
            //                }
            //            })
            //        }
            //        console.log(isOk);
            //        if(isOk) {
            //            next();
            //        } else {
            //            res.send("error");
            //        }
            //    })
            //} else {
            //    next();
            //}
        });

        //　**********************　　前台　********************
        this.app.get('/',showIndexController.index);
        this.app.post('/index/header',showIndexController.header);                                 //头部
        this.app.post('/index/statistics',showIndexController.statistics);                         //网站统计

        this.app.get("/show/detail",showDetailController.detail);                                  //详情页
        this.app.post("/detail/getForumByArticleId",showDetailController.getForumByArticleId);     //根据文章id获取模块名
        this.app.get("/show/lists",showListsController.lists);                                     //列表页
        this.app.get("/lists/tag",showListsController.tag);                                        //标签

        //评论
        this.app.post("/comment/getComments",showCommentController.getComments);
        this.app.post("/comment/submitComment",showCommentController.submitComment);
        this.app.post("/comment/submitReplyComment",showCommentController.submitReplyComment);
        this.app.post("/comment/submitSupport",showCommentController.submitSupport);

        //用户
        this.app.post("/user/isLogin",showUserController.isLogin);
        this.app.post("/user/login",showUserController.login);
        this.app.post("/user/signin",showUserController.signin);
        this.app.post("/user/isExistUsername",showUserController.isExistUsername);
        this.app.get("/user/captcha",showUserController.captcha);

        //留言板
        this.app.get("/guestbook/index",showGuestbookController.index);
        this.app.get("/guestbook/getMessages",showGuestbookController.getMessages);
        this.app.post("/guestbook/submit",showGuestbookController.submit);
        this.app.post("/guestbook/submitReply",showGuestbookController.submitReply);
        this.app.post("/guestbook/submitSupport",showGuestbookController.submitSupport);




        //　**********************　　后台　********************
        //后台管理页
        this.app.get('/admin',adminIndexController.index);
        this.app.get('/login',adminIndexController.login);
        this.app.post('/login/submit',adminIndexController.submit);
        this.app.get('/login/captcha',adminIndexController.captcha);
        this.app.post('/login/isExistAdmin',adminIndexController.isExistAdmin);

        //用户
        this.app.get("/user/index",adminUserController.index);
        this.app.post("/user/getList",adminUserController.getList);
        this.app.get("/user/userOperate",adminUserController.userOperate);
        this.app.post("/user/update",adminUserController.update);
        this.app.post("/user/remove",adminUserController.remove);

        //文章
        this.app.get('/article/index',adminArticleController.index);
        this.app.get('/article/operate',adminArticleController.operate);
        this.app.post('/article/list',adminArticleController.list);
        this.app.post('/article/create',adminArticleController.create);
        this.app.post('/article/remove',adminArticleController.remove);
        this.app.post('/article/edit',adminArticleController.edit);
        this.app.post('/article/getTag',adminArticleController.getTag);
        this.app.post('/article/spider',adminArticleController.spider);
        this.app.post('/article/submitSpider',adminArticleController.submitSpider);


        var multipart = require('connect-multiparty');
        var multipartMiddleware = multipart();
        this.app.post('/article/uploadImg',multipartMiddleware,adminArticleController.uploadImg);

        //模块
        this.app.post('/forum/list',adminForumController.list);
        this.app.post('/forum/create',adminForumController.create);
        this.app.post('/forum/edit',adminForumController.edit);
        this.app.post('/forum/remove',adminForumController.remove);
        this.app.get('/forum/operate',adminForumController.operate);


        //评论
        this.app.get('/comment/index',adminCommentController.index);
        this.app.post('/comment/getList',adminCommentController.getList);
        this.app.post('/comment/remove',adminCommentController.remove);

        //角色
        this.app.get('/role/index',adminRoleController.index);
        this.app.get('/role/roleOperate',adminRoleController.roleOperate);
        this.app.post('/role/create',adminRoleController.create);
        this.app.post('/role/edit',adminRoleController.edit);
        this.app.post('/role/list',adminRoleController.list);
        this.app.post('/role/remove',adminRoleController.remove);
        this.app.post('/role/getUsers',adminRoleController.getUsers);
        this.app.post('/role/getPermissions',adminRoleController.getPermissions);
        this.app.post('/role/submitUsers',adminRoleController.submitUsers);
        this.app.post('/role/removeUsers',adminRoleController.removeUsers);
        this.app.post('/role/submitPermissions',adminRoleController.submitPermissions);
        this.app.post('/role/removePermissions',adminRoleController.removePermissions);

        //权限
        this.app.get("/permission/index",adminPermissionController.index);
        this.app.post("/permission/getList",adminPermissionController.getList);
        this.app.get("/permission/permissionOperate",adminPermissionController.permissionOperate);
        this.app.post("/permission/create",adminPermissionController.create);
        this.app.post("/permission/edit",adminPermissionController.edit);
        this.app.post("/permission/remove",adminPermissionController.remove);
    },
    apiRoute: function() {
        // api路由正则表达式   /api/v1.0/{control}/action/{params}
        var apiRouteRegEx = /^\/(api)\/(v[1-9]\.[0-9])\/([a-zA-Z0-9_\.~-]+)\/([a-zA-Z0-9_-]+)(.*)/;
        this.app.get(apiRouteRegEx,function(req,res) {
            //检查请求是否合法
            if(common.checkReq(req, res))
            {
                //根据请求url引用对应的控制器　/api/v1.0/{control}/action/{params}
                var controller = require("../api/"+req.params[1]+"/"+req.params[2]);
                //根据请求url拿到action部分
                var action = req.params[3];
                //检查controller里面是否有此action
                if(controller.hasOwnProperty(action)) {
                    //控制器处理请求
                    controller[action](req,res);
                } else {
                    //如果没有直接返回错误信息
                    common.resError(99,null,res);
                }
            } else {
                common.resError(100,null,res);
            }
        });
        this.app.post(apiRouteRegEx,function(req,res) {
            //检查请求是否合法
            if(common.checkReq(req, res))
            {
                //根据请求url引用对应的控制器　/api/v1.0/{control}/action/{params}
                var controller = require("../api/"+req.params[1]+"/"+req.params[2]);
                //根据请求url拿到action部分
                var action = req.params[3];
                //检查controller里面是否有此action
                if(controller.hasOwnProperty(action)) {
                    //控制器处理请求
                    controller[action](req,res);
                } else {
                    //如果没有直接返回错误信息
                    common.resError(99,null,res);
                }
            } else {
                common.resError(100,null,res);
            }
        });
    }
}

module.exports = route;

