/**
 * Created by Administrator on 2016-01-28.
 */

var daoBase = require('./base');
var forumModel = require('./../models').forum;

var dao = {};
var forumDao = new daoBase(forumModel);
dao.base = forumDao;
module.exports = dao;



