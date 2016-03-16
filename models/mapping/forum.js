/**
 * Created by Administrator on 2016/2/17.
 */
var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    name:String,
    sortId:Number,
    enabled:Boolean
}, {collection : 'forum'});
schema.plugin(mongoosePaginate);
var user = mongoose.model('forum', schema);
exports = user;
