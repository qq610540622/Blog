/**
 * Created by Administrator on 2016-03-18.
 */

var daoBase = require('./base');
var permissionModel = require('./../models').permission;

var dao = {};
var permissionDao = new daoBase(permissionModel);
dao.base = permissionDao;
dao.model = permissionModel;
module.exports = dao;