/**
 * Created by Administrator on 2016/3/3.
 */

var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    content:String,
    commitTime:{type:Number,default:Date.now()},
    username:String,
    supportCount:{type:Number,default:0},
    icon:Number,
    status:{type:Number,default:0},
    reply:[]
}, {collection : 'guestbook'});
schema.plugin(mongoosePaginate);
var user = mongoose.model('guestbook', schema);
exports = user;
