/**
 * Created by Administrator on 2016/3/16.
 */


var daoBase = require('./base');
var rbacModel = require('./../models').rbac;

var dao = {};
var userDao = new daoBase(rbacModel);

dao.base = userDao;
dao.model = rbacModel;

module.exports = dao;



