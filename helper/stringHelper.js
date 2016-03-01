
/********************************************************
 *
 * 字符串处理方法
 *
 */
var helper = {};

/**
 * html编码
 * @param str html代码
 * @returns {string}
 */
helper.htmlEncode = function(str)
{
    if(str) return "";
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/ </g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/    /g,"&nbsp;");
    s = s.replace(/\'/g,"'");
    s = s.replace(/\"/g,"&quot;");
    s = s.replace(/\n/g," <br>");
    return s;
}

/**
 * html解码
 * @param str 要解码的html代码
 * @returns {string}
 */
helper.htmlDecode = function(str)
{
    if(str) return "";
    var s = "";
    if(str.length    == 0)    return    "";
    s = str.replace(/&gt;/g,"&");
    s = s.replace(/&lt;/g, " <");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/'/g,"\'");
    s = s.replace(/&quot;/g,"\"");
    s = s.replace(/ <br>/g,"\n");
    return s;
}


/**
 * 编码base64
 * @param str
 * @returns {string}
 */
helper.encode2Base64 = function(str) {
    if(str) return "";
    var buf = new Buffer(content);
    return buf.toString("base64");
}


/**
 * 解码base64
 * @param str
 * @returns {string}
 */
helper.decode2Base64 = function(str) {
    if(str) return "";
    var buf = new Buffer(str,"base64");
    return buf.toString();
}

module.exports = helper;

