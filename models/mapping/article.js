var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    forumId:String,
    title:String,
    content:String,
    author:String,
    redirectUrl:{type:String,default:""},
    tag:[],
    createDate:Number,
    readCount:{type:Number,default:0}
}, {collection : 'article'});
var user = mongoose.model('article', schema);
exports = user;
