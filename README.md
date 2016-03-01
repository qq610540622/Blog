#&nbsp;blog



项目目录结构

blog<br/>
&nbsp;|<br/>
&nbsp;|--app<br/>
&nbsp;|	|--admin						//后台<br/>
&nbsp;|	|&nbsp;&nbsp;|--controllers<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--article.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--comment.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--forum.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--home.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--user.js<br/>
&nbsp;|	|&nbsp;&nbsp;|--views<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--articleIndex.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--articleOperate.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--commentIndex.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--forumOperate.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--home.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--login.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--userIndex.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--userOperate.ejs<br/>
&nbsp;|	|--show						&nbsp;&nbsp;&nbsp;//前台<br/>
&nbsp;|	|&nbsp;&nbsp;|--controllers<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--comment.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--detail.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--index.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--lists.js<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--user.js<br/>
&nbsp;|	|&nbsp;&nbsp;|--views<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--includes<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--comment.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--footer.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--head.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--header.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--pagination.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--pages<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--detail.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--index.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--lists.ejs<br/>
&nbsp;|	|&nbsp;&nbsp;|&nbsp;&nbsp;|--layout.ejs<br/>
&nbsp;|	|<br/>
&nbsp;|	|<br/>
&nbsp;|--helper						&nbsp;//辅助类<br/>
&nbsp;|&nbsp;&nbsp;|--commonHelper.js<br/>
&nbsp;|&nbsp;&nbsp;|--dateHelper.js<br/>
&nbsp;|&nbsp;&nbsp;|--paginationHelper.js<br/>
&nbsp;|&nbsp;&nbsp;|--stringHelper.js<br/>
&nbsp;|<br/>
&nbsp;|<br/>
&nbsp;|--dao							//业务层<br/>
&nbsp;|&nbsp;&nbsp;|--base.js<br/>
&nbsp;|&nbsp;&nbsp;|--article.js<br/>
&nbsp;|&nbsp;&nbsp;|--comment.js<br/>
&nbsp;|&nbsp;&nbsp;|--forum.js<br/>
&nbsp;|&nbsp;&nbsp;|--user.js<br/>
&nbsp;|<br/>
&nbsp;|<br/>
&nbsp;|--models						//实体		<br/>
&nbsp;|&nbsp;&nbsp;|--mapping<br/>
&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--article.js<br/>
&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--comment.js<br/>
&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--forum.js<br/>
&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|--user.js<br/>
&nbsp;|&nbsp;&nbsp;|--index.js<br/>
&nbsp;|<br/>
&nbsp;|<br/>
&nbsp;|--public						//静态资源<br/>
&nbsp;|&nbsp;&nbsp;|--build<br/>
&nbsp;|&nbsp;&nbsp;|--images<br/>
&nbsp;|&nbsp;&nbsp;|--libs<br/>
&nbsp;|&nbsp;&nbsp;|--sass<br/>
&nbsp;|<br/>
&nbsp;|<br/>
&nbsp;|--routes						//路由<br/>
&nbsp;|&nbsp;&nbsp;|--index.js<br/>
&nbsp;|<br/>
&nbsp;|<br/>
&nbsp;|--.bowerrc<br/>
&nbsp;|<br/>
&nbsp;|--.gitignore<br/>
&nbsp;|<br/>
&nbsp;|--app.js						//主程序<br/>
&nbsp;|<br/>
&nbsp;|--bower.json<br/>
&nbsp;|<br/>
&nbsp;|--gulpfile.js<br/>
&nbsp;|<br/>
&nbsp;|--package.json<br/>
&nbsp;|<br/>
&nbsp;|--README.md<br/>
&nbsp;|<br/>
&nbsp;|--settings.js					//设置参数<br/>
&nbsp;|<br/>