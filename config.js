/**
 * 项目配置参数
 * @type {{cookieSecret: string, db: string, host: string}}
 */

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,
    mini_assets : false,
    site_static_host: '',
    host: 'localhost',
    port: 3000,
    cookieSecret:"blog",
    db: 'mongodb://127.0.0.1:27017/blog',
    file_limit: '1MB',
    session_secret: 'jack-blog',
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
    apiConfig: {
        controller: [
            "article",
            "comment"
        ],
        ips: [
            "*.*.*.*"
        ],
        version: [
            "v1.0",
            "v1.1"
        ],
        errorCodes:{
            99: "not found action method",
            100: "unknown controller",
            101: "not found resource",
            102: "id cant's null or empty",
            103: "get by id not found",
            104: "id can't great than 15",
            105: "get list is error",
            106: "page must be great than zero",
            107: "rows must be great than zero",
            108: "forumId and title must be not null",
            109: "create faild",
            110: "data error",
            111: "remove error"
        }
    }
};

if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1/node_club_test';
}

module.exports = config;