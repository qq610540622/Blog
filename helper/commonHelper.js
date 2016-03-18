/**
 * Created by Administrator on 2016-02-25.
 */


var settings = require("../settings");

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




/**
 * 检查controller是否包含配置项中
 */
commonHelper.checkVersion = function (req) {
    for (var i = 0, z = settings.apiConfig.version.length; i < z; i++) {
        if (settings.apiConfig.version[i] === req.params[1]) {
            return true;
        }
    }
    return false;
};


/**
 * 检查controller是否包含配置项中
 */
commonHelper.checkKey = function (req) {
    for (var i = 0, z = settings.apiConfig.controller.length; i < z; i++) {
        if (settings.apiConfig.controller[i] === req.params[2]) {
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
    for (var i=0, z=settings.apiConfig.ips.length-1; i<=z; i++) {
        curIP = settings.apiConfig.ips[i].split(".");
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
    if(!this.checkVersion(req) || !this.checkKey(req) || !this.checkIP(req)) {
        return false;
    }
    return true;
};


/**
 * 响应错误信息
 */
commonHelper.resError = function (code, raw, res) {
    res.send({ "status": "error", "code": code, "message": settings.apiConfig.errorCodes[code], "raw": raw });
    return false;
};


/**
 * 响应成功数据
 */
commonHelper.resSuccess = function (data, res) {
    res.send({ "status": "success", "data": data });
    return false;
};


var roleDao = require("./../dao/role");
var permissionDao = require("./../dao/permission");
var async = require("async");
commonHelper.getUserOwnPermissions = function(username) {
    async.waterfall([
        function(callback) {

        }
    ],function(err,result) {
        var t = err?{}:result;
        return t;
    })
}
commonHelper.getPermissions = function() {
    permissionDao.base.getAll(function(err,results) {
        return err ? [] : results;
    })
}

commonHelper.checkIsAccess = function(username,url) {
    async.series({
        permissions:function(callback) {
            permissionDao.base.getAll(function(err,results) {
                if(err) callback(err,null);
                else callback(null,results);
            })
        },
        userOwnPermissions:function(callback) {
            roleDao.base.getByQuery({users:username},{permissions:1},{multi:true,upset:false},function(err,results) {
                var obj = {};
                if(err) callback(err,null);
                else {
                    results.forEach(function(items) {
                        if(items && items.permissions.length>0) {
                            for(var i=0, len=items.permissions.length; i<len; i++) {
                                obj[items.permissions[i]] = true;
                            }
                        }
                    });
                    callback(null,obj);
                }
            })
        }
    },function(err,data) {
        if(data && data.permissions) {
            data.permissions.forEach(function(item) {
                if(url.indexOf(item.permissionCode) != -1) {
                    if(data.userOwnPermissions[item.permissionCode]) {
                        return true;
                    }
                }
            })
        }
        return false;
    })



    /*async.waterfall([
        function(callback) {
            roleDao.base.getByQuery({users:username},{permissions:1},{multi:true,upset:false},function(err,results) {
                var obj = {};
                if(err) callback(err,null);
                else {
                    results.forEach(function(items) {
                        if(items && items.permissions.length>0) {
                            for(var i=0, len=items.permissions.length; i<len; i++) {
                                obj[items.permissions[i]] = true;
                            }
                        }
                    });
                    callback(null,obj);
                }
            })
        }
    ],function(err,result) {
        console.log(result);
    })*/


}


module.exports = commonHelper;
