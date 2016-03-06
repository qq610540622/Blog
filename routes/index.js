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


module.exports = function(app) {
    /* 拦截器 */
    app.use(function(req,res,next) {
        if(new RegExp("/admin","i").test(req.url)) {
            if(!req.session.adminName) {
                res.redirect("/login");
                return;
            }
        }
        next();
    })

    //　**********************　　前台　********************
    app.get('/',showIndexController.index);
    app.post('/index/header',showIndexController.header);                                  //头部
    app.post('/index/statistics',showIndexController.statistics);                         //网站统计

    app.get("/show/detail",showDetailController.detail);                                  //详情页
    app.post("/detail/getForumByArticleId",showDetailController.getForumByArticleId);   //根据文章id获取模块名
    app.get("/show/lists",showListsController.lists);                                     //列表页
    app.get("/lists/tag",showListsController.tag);                                        //标签

    //评论
    app.post("/comment/getComments",showCommentController.getComments);
    app.post("/comment/submitComment",showCommentController.submitComment);
    app.post("/comment/submitReplyComment",showCommentController.submitReplyComment);
    app.post("/comment/submitSupport",showCommentController.submitSupport);

    //用户
    app.post("/user/isLogin",showUserController.isLogin);
    app.post("/user/login",showUserController.login);
    app.post("/user/signin",showUserController.signin);
    app.post("/user/isExistUsername",showUserController.isExistUsername);
    app.get("/user/captcha",showUserController.captcha);

    //留言板
    app.get("/guestbook/index",showGuestbookController.index);
    app.get("/guestbook/getMessages",showGuestbookController.getMessages);
    app.post("/guestbook/submit",showGuestbookController.submit);
    app.post("/guestbook/submitReply",showGuestbookController.submitReply);
    app.post("/guestbook/submitSupport",showGuestbookController.submitSupport);






    //　**********************　　后台　********************
    //后台管理页
    app.get('/admin',adminIndexController.index);
    app.get('/login',adminIndexController.login);
    app.post('/login/submit',adminIndexController.submit);
    app.get('/login/captcha',adminIndexController.captcha);
    app.post('/login/isExistAdmin',adminIndexController.isExistAdmin);

    //用户
    app.get("/user/index",adminUserController.index);
    app.post("/user/getList",adminUserController.getList);
    app.get("/user/userOperate",adminUserController.userOperate);
    app.post("/user/update",adminUserController.update);
    app.post("/user/remove",adminUserController.remove);

    //文章
    app.get('/article/index',adminArticleController.index);
    app.get('/article/operate',adminArticleController.operate);
    app.post('/article/list',adminArticleController.list);
    app.post('/article/create',adminArticleController.create);
    app.post('/article/remove',adminArticleController.remove);
    app.post('/article/edit',adminArticleController.edit);
    app.post('/article/getTag',adminArticleController.getTag);
    app.post('/article/spider',adminArticleController.spider);
    app.post('/article/submitSpider',adminArticleController.submitSpider);

    //模块
    app.post('/forum/list',adminForumController.list);
    app.post('/forum/create',adminForumController.create);
    app.post('/forum/edit',adminForumController.edit);
    app.post('/forum/remove',adminForumController.remove);
    app.get('/forum/operate',adminForumController.operate);


    //评论
    app.get('/comment/index',adminCommentController.index);
    app.post('/comment/getList',adminCommentController.getList);
    app.post('/comment/remove',adminCommentController.remove);

　　　　
}





