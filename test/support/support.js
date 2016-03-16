

/**
 * 提供测试数据
 */

var eventproxy = require('eventproxy');
var ready = require('ready');
var articleDao = require("../../dao/article");
var commentDao = require("../../dao/comment");
var userDao = require("../../dao/user");
var proxy = new eventproxy();



proxy.fail(function(err) {
	console.log(err);
});
ready(exports);

proxy.all('article','articles', 'comment','user', function(article,articles, comment,user) {
	exports.article = article;
	exports.articles = articles;
	exports.comment = comment;
    exports.user = user;
	exports.ready(true);
});

/**
 * 单个文章
 */
createArticle(proxy.done("article"))
/*createArticle(function(err,result) {
    proxy.emit("article",result);
});*/

createArticles(proxy.done("articles"))


/**
 * 评论
 */
createUser(proxy.done("comment"))

/**
 * 用户
 */
createUser(proxy.done("user"))


function createArticle(callback) {
    articleDao.base.getSingleByQuery({},callback);
}
function createArticles(callback) {
    articleDao.getArticles(3,callback);
}

function createComment(callback) {
    commentDao.base.getSingleByQuery({},callback);
}

function createUser(callback) {
    userDao.base.getSingleByQuery({},callback);
}