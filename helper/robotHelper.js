/**
 * Created by Administrator on 2016-03-03.
 */


var urlUtil = require("url");
var http = require("http");
var https = require("https");
var cheerio = require("cheerio");
var fs = require("fs");


function robot(articleList,callback) {
    this.articleList = articleList;
    this.callback = callback;
    self = this;
}

var articleDao = require("./../dao/article");
robot.prototype = {
    construct:robot,
    crawler:function() {
        if(self.articleList.length>0) {
            var article = self.articleList.shift();
            self.sendRequest(article);
        } else {
            self.callback();
        }
    },
    handlerSuccess:function(article) {
        $ = cheerio.load(article.content,{decodeEntities: false});
        article.content = $("#cnblogs_post_body").html();
        articleDao.base.create(article,function(err,res) {
            console.log(err);
            console.log(res);
            if(err) return;
            else {
                self.crawler();
            }
        })
    },
    sendRequest:function(article) {
        var req = '';
        var oOptions = urlUtil.parse(article.redirectUrl);
        oOptions.headers = {
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36",
        };
        req = http.request(oOptions);
        req.on('response',function(res){
            var aType = self.getResourceType(res.headers["content-type"]);
            var data = '';
            if(aType[2] !== "binary"){
                if((["utf8"]).indexOf(aType[2]) > -1){
                    res.setEncoding(aType[2]);
                }
            } else {
                res.setEncoding("binary");
            }
            res.on('data',function(chunk){
                data += chunk;
            });
            res.on('end',function(){ //获取数据结束
                article.content = data;
                self.handlerSuccess(article);
                data = null;
            });
            res.on('error',function(){
            });
        }).on('error',function(err){
        }).on('finish',function(){//调用END方法之后触发
        });
        req.end();//发起请求
    },
    getResourceType : function(type){
        if(!type){
            return '';
        }
        var aType = type.split('/');
        aType.forEach(function(s,i,a){
            a[i] = s.toLowerCase();
        });
        if(aType[1] && (aType[1].indexOf(';') > -1)){
            var aTmp = aType[1].split(';');
            aType[1] = aTmp[0];
            for(var i = 1; i < aTmp.length; i++){
                if(aTmp[i] && (aTmp[i].indexOf("charset") > -1)){
                    aTmp2 = aTmp[i].split('=');
                    aType[2] = aTmp2[1] ? aTmp2[1].replace(/^\s+|\s+$/,'').replace('-','').toLowerCase() : '';
                }
            }
        }
        if((["image"]).indexOf(aType[0]) > -1){
            aType[2] = "binary";
        }
        return aType;
    }
};

module.exports = robot;
