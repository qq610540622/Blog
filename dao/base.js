/**
 * Created by Administrator on 2016-01-28.
 */

function Base (Model){
    this.model = Model;
}

//create
Base.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(false,error);
        return callback(true,doc);
    });
};


Base.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


Base.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


Base.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

Base.prototype.getSingleByQuery = function (query,callback) {
    this.model.findOne(query, function(error,model){
        console.log("getSingleByQuery-->");
        console.log(model);
        if(error) return callback(error,null);
        return callback(null, model);
    });
};

Base.prototype.getListByQuery = function (query,callback) {
    this.model.find(query, function(error,model){
        if(error) return callback(error,null);
        return callback(null, model);
    });
};

Base.prototype.getAll = function (callback) {
    this.model.find({}, function(error,model){
        if(error) return callback(error,null);
        return callback(null, model);
    });
};

Base.prototype.remove = function (query, callback){
    this.model.remove(query, function(error){
        if(error) return callback(error);
        return callback(null);
    });
};


Base.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);
        return callback(null);
    });
};


Base.prototype.getListNotPagination = function(callback) {
    var query = this.model.find({},function(err,res) {
        if(err) {
            return callback(err);
        } else {
            jsonArray = {total:res.length,rows:res};
            return callback(jsonArray);
        }
    });
};


Base.prototype.getList = function(page,size,where,callback) {
    //拼接where条件
    var query = this.model.find(where);
    query.skip(size*(page-1));
    query.limit(size);
    var _this = this.model;
    query.exec(function(err,rs) {
        if(err) {
            return callback(false,err);
        } else {
            _this.find(where,function(err,res) {
                obj = {total:res.length,rows:rs};
                return callback(true,obj);
            })
        }
    });
};


module.exports = Base;