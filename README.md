# blog

<pre>
如有那些地方需要修改，或写得不好的地方请联系我。
QQ:610540622(请备注一下：nodejs)
预览地址：<a href="http://120.24.81.38:3000/" target="_blank">http://120.24.81.38:3000</a>


<h3>安装</h3>
git clone https://github.com/qq610540622/blog.git
cd blog
npm install
mkdir logs
node app


视图引擎：ejs
数据库：mongodb
框架：express
前台：bootstrap
后台：easyui


项目目录结构

blog
-|
-|--app
-|--|--admin                        //后台
-|--|--|--controllers
-|--|--|--|--article.js
-|--|--|--|--comment.js
-|--|--|--|--forum.js
-|--|--|--|--home.js
-|--|--|--|--user.js
-|--|--|--views
-|--|--|--|--articleIndex.ejs
-|--|--|--|--articleOperate.ejs
-|--|--|--|--commentIndex.ejs
-|--|--|--|--forumOperate.ejs
-|--|--|--|--home.ejs
-|--|--|--|--login.ejs
-|--|--|--|--userIndex.ejs
-|--|--|--|--userOperate.ejs
-|--|--show                         //前台
-|--|--|--controllers
-|--|--|--|--comment.js
-|--|--|--|--detail.js
-|--|--|--|--index.js
-|--|--|--|--lists.js
-|--|--|--|--user.js
-|--|--|--views
-|--|--|--|--includes
-|--|--|--|--|--comment.ejs
-|--|--|--|--|--footer.ejs
-|--|--|--|--|--head.ejs
-|--|--|--|--|--header.ejs
-|--|--|--|--|--pagination.ejs
-|--|--|--|--pages
-|--|--|--|--|--detail.ejs
-|--|--|--|--|--index.ejs
-|--|--|--|--|--lists.ejs
-|--|--|--|--layout.ejs
-|-|
-|-|
-|--helper                          //辅助类
-|--|--commonHelper.js
-|--|--dateHelper.js
-|--|--paginationHelper.js
-|--|--stringHelper.js
-|
-|
-|--dao                             //业务层
-|--|--base.js
-|--|--article.js
-|--|--comment.js
-|--|--forum.js
-|--|--user.js
-|
-|
-|--models                          //实体--
-|--|--mapping
-|--|--|--article.js
-|--|--|--comment.js
-|--|--|--forum.js
-|--|--|--user.js
-|--|--index.js
-|
-|
-|--public                          //静态资源
-|--|--build
-|--|--images
-|--|--libs
-|--|--sass
-|
-|
-|--routes                          //路由
-|--|--index.js
-|
-|
-|--.bowerrc
-|
-|--.gitignore
-|
-|--app.js                          //主程序
-|
-|--bower.json
-|
-|--gulpfile.js
-|
-|--package.json
-|
-|--README.md
-|
-|--settings.js                     //设置参数
-|

</pre>