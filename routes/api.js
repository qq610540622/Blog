/**
 * Created by Administrator on 2016-03-10.
 */

var config = {
    // Authentication keys
    keys: [
        "article",
        "user"
    ],
    /**
     * Allowed IP's or ranges
     * Can use * for wildcards, *.*.*.* for no restrictions
     */
    ips: [
        "*.*.*.*"
    ],
    /**
     * SSL Config
     * Set key and cert to absolute path if SSL used, false if not
     */
    ssl: {
        key: false,
        cert: false
    },
    // Port designation
    port: 8080,
    // Base directory
    base: "example/base",
    // Default create mode
    cmode: "0755"
};

// Regular Expressions
var commandRegEx = /^\/(api)\/(v[1-9]\.[0-9])\/([a-zA-Z0-9_\.~-]+)\/(.*)/,  // /{key}/{command}/{path}
    pathRegEx = /^\/([a-zA-Z0-9_\.~-]+)\/(.*)/;  // /{key}/{path}


/**
 * Check Key (Called by checkReq)
 */
var checkKey = function (config, req) {
    // Loop through keys in config
    for (var i = 0, z = config.keys.length; i < z; i++) {
        if (config.keys[i] === req.params[2]) {
            return true;
        }
    }
    return false;
};

/**
 * Check IP (Called by checkReq)
 */
var checkIP = function (config, req) {
    var ip = req.connection.remoteAddress.split("."),
        curIP,
        b,
        block = [];
    for (var i=0, z=config.ips.length-1; i<=z; i++) {
        curIP = config.ips[i].split(".");
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
 * Check Request
 * Checks Key and IP Address
 */
var checkReq = function (config, req, res) {

    // Set access control headers
    res.header('Access-Control-Allow-Origin', '*');

    // Check key and IP
    if(!checkKey(config, req) || !checkIP(config, req)) {
        resError(101,null,res);
        return false;
    }
    
    return true;
};



module.exports = function(server) {

    /**
     * GET
     */
    server.get(commandRegEx, function (req, res, next) {
        // Check request
        checkReq(config, req, res);

        var controller = require("../api/controllers/"+req.params[2]);
        switch (req.params[3]) {
            case "get":
                if(!req.query.id) resError(102,null,res);
                var id = req.query.id;
                if(id.indexOf(",") == -1) {    //单个id
                    controller.getSingle(id,function(err,items) {
                        if(err) resError(103,null,res);
                        else resSuccess(items,res);
                    });
                } else {                        //多个id
                    var ids = id.split(',');
                    if(ids.length>15) resError(104,null,res);
                    controller.getListById(ids,function(err,items) {
                        if(err) resError(105,null,res);
                        else resSuccess(items,res);
                    });
                }
                break;
            case "list":
                var page = req.params.page || 1;    //默认从第1页开查询
                var rows = req.params.rows || 5;    //默认值为5条数据
                if(page<0) resError(106,null,res);
                if(rows<0) resError(107,null,res);
                rows = rows > 15 ? 15 : rows;   //最多取出15条数据
                controller.getList(page,rows,null,function(err,items) {
                    if(err) resError(105,null,res);
                    else resSuccess(items,res);
                });
                break;
        }
    });


    /**
     * POST
     */
    server.post(commandRegEx, function (req, res, next) {
        // 检查请求是否合法
        checkReq(config, req, res);
        
        console.log(req.body);
        
        var controller = require("../api/controllers/"+req.params[2]);
        switch (req.params[2]) {
            case "article":
                if(req.body.list) {
                    var list = req.body.list;
                    var isOk = true;
                    for(var i=0,len=list.length; i<len; i++) {
                        if(!list[i].forumId||!list[i].title) {
                            isOk = false;
                            break;
                        }
                    }
                    if(isOk) {
                        controller.create(list,function(err,item) {
                            if(err) resError(109,null,res);
                            else resSuccess(item,res);
                        });
                    } else {
                        resError(110,null,res);
                    }
                }
                break;
            case "user":
                resSuccess("post user",res);
                break;
            default:
                resError(100, null, res);
        }
    });


    /**
     * PUT
     */
    server.put(commandRegEx, function (req, res, next) {
        // Check request
        checkReq(config, req, res);
        // Set path
        var path = config.base + "/" + req.params[2];
        switch (req.params[2]) {
            case "article":
                resSuccess("put article",res);
                break;
            case "user":
                resSuccess("put user",res);
                break;
            default:
                resError(100, null, res);
        }
        return next();
    });


    /**
     * DELETE
     */
    server.del(commandRegEx, function (req, res, next) {
        checkReq(config, req, res);
        switch (req.params[2]) {
            case "article":
                resSuccess("DELETE article",res);
                break;
            case "user":
                resSuccess("DELETE user",res);
                break;
            default:
                resError(100, null, res);
        }
        return next();
    });




};