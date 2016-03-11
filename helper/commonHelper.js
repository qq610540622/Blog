/**
 * Created by Administrator on 2016-02-25.
 */


var commonHelper = {};


/**
 * 生成随机数
 * @param min
 * @param max
 * @returns {*}
 */
commonHelper.random = function(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * 生成验证码
 * @param width
 * @param height
 * @returns {Buffer}
 */
commonHelper.captcha = function(width,height,code) {
    var captchapng = require('captchapng');
    var p = new captchapng(width,height, code);
    p.color(0, 0, 0, 80);
    p.color(20, 20, 20, 255);

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    return imgbase64;
}


/**
 * md5加密
 * @param str
 * @returns {*}
 */
commonHelper.md5 = function(str) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest('hex');
}





commonHelper.apiConfig = {
    keys: [
        "article",
        "user"
    ],
    ips: [
        "*.*.*.*"
    ]
};



/**
 * 检查controller是否包含配置项中
 */
commonHelper.checkKey = function (req) {
    for (var i = 0, z = this.apiConfig.keys.length; i < z; i++) {
        if (this.apiConfig.keys[i] === req.params[2]) {
            return true;
        }
    }
    return false;
};


/**
 * 检查Ip是否合法
 */
commonHelper.checkIP = function (req) {
    var ip = req.connection.remoteAddress.split("."),
        curIP,
        b,
        block = [];
    for (var i=0, z=this.apiConfig.ips.length-1; i<=z; i++) {
        curIP = this.apiConfig.ips[i].split(".");
        b = 0;
        // Compare each block
        while (b<=3) {
            (curIP[b]===ip[b] || curIP[b]==="*") ? block[b] = true : block[b] = false;
            b++;
        }
        // Check all blocks
        if (block[0] && block[1] && block[2] && block[3]) {
            return true;
        }
    }
    return false;
};


/**
 * 检查http请求
 * 主要是检查controller是在配置项中和ip是否合法
 */
commonHelper.checkReq = function (req, res) {
    // Set access control headers
    res.header('Access-Control-Allow-Origin', '*');
    
    //不合法就直接返回100的错误码
    if(!this.checkKey(req) || !this.checkIP(req)) {
        this.resError(100,null,res);
        return false;
    }
    return true;
};


/**
 * 响应错误信息
 */
commonHelper.resError = function (code, raw, res) {
    var codes = {
        99: "not found action method",
        100: "unknown controller",
        101: "not found resource",
        102: "id cant's null or empty",
        103: "get by id not found",
        104: "ids can't great than 15",
        105: "get list is error",
        106: "page must be great than zero",
        107: "rows must be great than zero",
        108: "forumId and article title must be not null",
        109: "create faild",
        110: "data error",
        111: "remove error"
    };
    res.send({ "status": "error", "code": code, "message": codes[code], "raw": raw });
    return false;
};


/**
 * 响应成功数据
 */
commonHelper.resSuccess = function (data, res) {
    res.send({ "status": "success", "data": data });
    return false;
};



module.exports = commonHelper;
