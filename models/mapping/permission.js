/**
 * Created by Administrator on 2016-03-18.
 */


var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    permissionName:String,
    permissionCode:String
}, {collection : 'permission'});
var permission = mongoose.model('permission', schema);
exports = permission;