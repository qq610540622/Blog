var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    content:String,
    articleId:String,
    commentTime:Number,
    parentId:String,
    username:String,
    supportCount:{type:Number,default:0},
    icon:Number,
    status:{type:Number,default:0}
}, {collection : 'comment'});
schema.plugin(mongoosePaginate);
var user = mongoose.model('comment', schema);
exports = user;


