/**
 * Created by Administrator on 2016-01-27.
 */

var showIndexController = require("../app/show/controllers/index");
var showDetailController = require("../app/show/controllers/detail");
var showListsController = require("../app/show/controllers/lists");
var showCommentController = require("../app/show/controllers/comment");
var showUserController = require("../app/show/controllers/user");
var showGuestbookController = require("../app/show/controllers/guestbook");
var showChatController = require("../app/show/controllers/chat");




var adminIndexController = require("../app/admin/controllers/home");
var adminArticleController = require("../app/admin/controllers/article");
var adminUserController = require("../app/admin/controllers/user");
var adminForumController = require("../app/admin/controllers/forum");
var adminCommentController = require("../app/admin/controllers/comment");
var adminRoleController = require("../app/admin/controllers/role");
var adminPermissionController = require("../app/admin/controllers/permission");


var tools = require("./../common/tools");
var cors = require('cors');
/**
 * 路由器类
 */
var route = function(app) {
    this.app = app;
    this.run();
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
            if(req.path.length == 6 && new RegExp("/admin","i").test(req.path)) {
                if(!req.session.adminName) {
                    res.redirect("/admin/login");
                    return;
                }
            }
            next();
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
        this.app.post("/user/signin", showUserController.signin);                 //登录
        this.app.post("/user/signup", showUserController.signup);                 //注册
        this.app.post("/user/signout",showUserController.signout);
        this.app.post("/user/isExistUsername",showUserController.isExistUsername);
        this.app.get("/user/captcha",showUserController.captcha);

        //留言板
        this.app.get("/guestbook/index",showGuestbookController.index);
        this.app.get("/guestbook/getMessages",showGuestbookController.getMessages);
        this.app.post("/guestbook/submit",showGuestbookController.submit);
        this.app.post("/guestbook/submitReply",showGuestbookController.submitReply);
        this.app.post("/guestbook/submitSupport",showGuestbookController.submitSupport);

        //聊天
        this.app.get("/chat/index",showChatController.index);


        //　**********************　　后台　********************
        //后台管理页
        this.app.get('/admin',adminIndexController.index);
        this.app.get('/admin/login',adminIndexController.login);
        this.app.post('/admin/login/submit',adminIndexController.submit);
        this.app.get('/admin/login/captcha',adminIndexController.captcha);
        this.app.post('/admin/login/isExistAdmin',adminIndexController.isExistAdmin);

        //用户
        this.app.get("/admin/user/index",adminUserController.index);
        this.app.post("/admin/user/getList",adminUserController.getList);
        this.app.get("/admin/user/userOperate",adminUserController.userOperate);
        this.app.post("/admin/user/update",adminUserController.update);
        this.app.post("/admin/user/remove",adminUserController.remove);

        //文章
        this.app.get('/admin/article/index',adminArticleController.index);
        this.app.get('/admin/article/operate',adminArticleController.operate);
        this.app.post('/admin/article/list',adminArticleController.list);
        this.app.post('/admin/article/create',adminArticleController.create);
        this.app.post('/admin/article/remove',adminArticleController.remove);
        this.app.post('/admin/article/edit',adminArticleController.edit);
        this.app.post('/admin/article/getTag',adminArticleController.getTag);
        this.app.post('/admin/article/spider',adminArticleController.spider);
        this.app.post('/admin/article/submitSpider',adminArticleController.submitSpider);


        var multipart = require('connect-multiparty');
        var multipartMiddleware = multipart();
        this.app.post('/admin/article/uploadImg',multipartMiddleware, adminArticleController.uploadImg);

        //模块
        this.app.post('/admin/forum/list',adminForumController.list);
        this.app.post('/admin/forum/create',adminForumController.create);
        this.app.post('/admin/forum/edit',adminForumController.edit);
        this.app.post('/admin/forum/remove',adminForumController.remove);
        this.app.get('/admin/forum/operate',adminForumController.operate);


        //评论
        this.app.get('/admin/comment/index',adminCommentController.index);
        this.app.post('/admin/comment/getCommentList', adminCommentController.getCommentList);
        this.app.post('/admin/comment/remove',adminCommentController.remove);

        //角色
        this.app.get('/admin/role/index',adminRoleController.index);
        this.app.get('/admin/role/roleOperate',adminRoleController.roleOperate);
        this.app.post('/admin/role/create',adminRoleController.create);
        this.app.post('/admin/role/edit',adminRoleController.edit);
        this.app.post('/admin/role/list',adminRoleController.list);
        this.app.post('/admin/role/remove',adminRoleController.remove);
        this.app.post('/admin/role/getUsers',adminRoleController.getUsers);
        this.app.post('/admin/role/getPermissions',adminRoleController.getPermissions);
        this.app.post('/admin/role/submitUsers',adminRoleController.submitUsers);
        this.app.post('/admin/role/removeUsers',adminRoleController.removeUsers);
        this.app.post('/admin/role/submitPermissions',adminRoleController.submitPermissions);
        this.app.post('/admin/role/removePermissions',adminRoleController.removePermissions);
        this.app.post('/admin/role/isRepeatRoleCode',adminRoleController.isRepeatRoleCode);

        //权限
        this.app.get("/admin/permission/index",adminPermissionController.index);
        this.app.post("/admin/permission/getList",adminPermissionController.getList);
        this.app.get("/admin/permission/permissionOperate",adminPermissionController.permissionOperate);
        this.app.post("/admin/permission/create",adminPermissionController.create);
        this.app.post("/admin/permission/edit",adminPermissionController.edit);
        this.app.post("/admin/permission/remove",adminPermissionController.remove);

    },
    apiRoute: function() {
        // api路由正则表达式   /api/v1.0/{control}/action/{params}
        var apiRouteRegEx = /^\/(api)\/(v[1-9]\.[0-9])\/([a-zA-Z0-9_\.~-]+)\/([a-zA-Z0-9_-]+)(.*)/;
        this.app.get(apiRouteRegEx,cors(),function(req,res) {
            //检查请求是否合法
            if(tools.checkReq(req, res))
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
                    tools.resError(99,null,res);
                }
            } else {
                tools.resError(100,null,res);
            }
        });
        this.app.post(apiRouteRegEx,function(req,res) {
            //检查请求是否合法
            if(tools.checkReq(req, res))
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
                    tools.resError(99,null,res);
                }
            } else {
                tools.resError(100,null,res);
            }
        });
    }
};

module.exports = route;

