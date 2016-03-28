var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    forumId:String,
    title:String,
    content:String,
    author:{type:String,default:"admin"},
    redirectUrl:{type:String,default:""},
    tag:[],
    createDate:Number,
    readCount:{type:Number,default:0}
}, {collection : 'article'});
schema.plugin(mongoosePaginate);
var user = mongoose.model('article', schema);
exports = user;
