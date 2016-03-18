/**
 * Created by Administrator on 2016/3/16.
 */


var daoBase = require('./base');
var roleModel = require('./../models').role;

var dao = {};
var userDao = new daoBase(roleModel);

dao.base = userDao;
dao.model = roleModel;

module.exports = dao;



