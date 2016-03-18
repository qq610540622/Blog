/**
 * Created by Administrator on 2016-03-18.
 */

var permissionDao = require("./../../../dao/permission");

var controller = {};

/**
 * Ȩ����ҳ
 * @param req
 * @param res
 */
controller.index = function(req,res) {
    res.render("permissionIndex");
}


/**
 * ��ȡ�б�
 * @param req
 * @param res
 */
controller.getList = function(req,res) {
    permissionDao.base.getListNotPagination(function(err,result) {
        if(err) res.send("error");
        else {
            res.json(result);
        }
    })
}


/**
 * ����(�������޸�)
 * @param req
 * @param res
 */
controller.permissionOperate = function(req,res) {
    var operate = req.query.operate;
    if(operate == "create") {
        var data = {operate:"create",model:null};
        res.render("permissionOperate",data);
    } else if(operate == "edit") {
        var _id = req.query._id;
        if(_id) {
            permissionDao.base.getSingleByQuery({_id:_id},function(err,result) {
                if(err) res.render("error");
                else {
                    var data = {operate:"edit",model:result};
                    res.render("permissionOperate",data);
                }
            });
        }
    }
}


/**
 * ����
 * @param req
 * @param res
 */
controller.create = function(req,res) {
    var permissionName = req.body.permissionName;
    var permissionCode = req.body.permissionCode;
    console.log(permissionName)
    console.log(permissionCode)
    if(permissionName && permissionCode) {
        var model = {permissionName:permissionName,permissionCode:permissionCode};
        permissionDao.base.create(model,function(err,result) {
            res.send(err ? "error" : "success");
        });
    } else {
        res.send("error");
    }
}


/**
 * �޸�
 * @param req
 * @param res
 */
controller.edit = function(req,res) {
    var _id = req.body._id;
    var permissionName = req.body.permissionName;
    var permissionCode = req.body.permissionCode;
    if(_id && permissionName && permissionCode) {
        permissionDao.base.update({_id:_id},{$set:{permissionName:permissionName,permissionCode:permissionCode}},{multi:false,upset:false},function(err) {
            res.send(err ? "error" : "success");
        });
    } else {
        res.send("error");
    }
}


/**
 * ɾ��
 * @param req
 * @param res
 */
controller.remove = function(req,res) {
    var _id = req.body._id;
    if(_id) {
        permissionDao.base.remove({_id:_id},function(err) {
            res.send(err ? "error" : "success");
        });
    } else {
        res.send("error");
    }
}


module.exports = controller;

