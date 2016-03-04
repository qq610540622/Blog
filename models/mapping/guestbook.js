/**
 * Created by Administrator on 2016/3/3.
 */

var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    content:String,
    commitTime:{type:Number,default:Date.now()},
    parentId:String,
    username:String,
    supportCount:{type:Number,default:0},
    icon:Number,
    status:{type:Number,default:0}
}, {collection : 'guestbook'});
var user = mongoose.model('guestbook', schema);
exports = user;