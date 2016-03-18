/**
 * Created by Administrator on 2016/3/16.
 */

var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    roleName:String,
    permissions:[],
    users:[]
}, {collection : 'role'});
var role = mongoose.model('role', schema);
exports = role;