

/**
 * 提供测试数据
 */

var eventproxy = require('eventproxy');
var ready = require('ready');
var articleDao = require("../../dao/article");
var commentDao = require("../../dao/comment");
var forumDao = require("../../dao/forum");
var userDao = require("../../dao/user");
var proxy = new eventproxy();



proxy.fail(function(err) {
	console.log(err);
});
ready(exports);

proxy.all('article','articles', 'comment','user','forum', function(article,articles, comment,user,forum) {
	exports.article = article;
	exports.articles = articles;
	exports.comment = comment;
    exports.user = user;
    exports.forum = forum;
	exports.ready(true);
});

/**
 * 单个文章
 */
createArticle(proxy.done("article"))

/**
 * 多个文章
 */
createArticles(proxy.done("articles"))

/**
 * 评论
 */
createComment(proxy.done("comment"))

/**
 * 用户
 */
createUser(proxy.done("user"))

/**
 * 模块
 */
createForum(proxy.done("forum"));

function createArticle(callback) {
    articleDao.base.getSingleByQuery({},callback);
}

function createArticles(callback) {
    articleDao.getArticles(2,callback);
}

function createComment(callback) {
    commentDao.base.getSingleByQuery({},callback);
}

function createUser(callback) {
    userDao.base.getSingleByQuery({},callback);
}

function createForum(callback) {
    forumDao.base.getSingleByQuery({},callback);
}