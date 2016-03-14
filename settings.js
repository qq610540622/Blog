/**
 *
 * @type {{cookieSecret: string, db: string, host: string}}
 */
module.exports={
    cookieSecret:"blog",
    connectionstring: 'mongodb://127.0.0.1:27017/blog',
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
}