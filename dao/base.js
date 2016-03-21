/**
 * Created by Administrator on 2016-01-28.
 */

function Base (Model){
    this.model = Model;
}

//create
Base.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error,null);
        return callback(null,doc);
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


Base.prototype.getSingleByQuery = function (query,callback) {
    this.model.findOne(query, function(error,model){
        if(error) return callback(error,null);
        return callback(null, model);
    });
};


Base.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

// Base.prototype.getListByQuery = function (query,callback) {
//     this.model.find(query, function(error,model){
//         if(error) return callback(error,null);
//         return callback(null, model);
//     });
// };

// Base.prototype.getAll = function (callback) {
//     this.model.find({}, function(error,model){
//         if(error) return callback(error,null);
//         return callback(null, model);
//     });
// };

// Base.prototype.getListNotPagination = function(callback) {
//     var query = this.model.find({},function(err,res) {
//         if(err) return callback(err, null);
//         else {
//             jsonArray = {total:res.length,rows:res};
//             return callback(null, jsonArray);
//         }
//     });
// };


// Base.prototype.getList = function(page,size,where,callback) {
//     this.model.paginate(where, { page: page, limit: size }, function(err, result) {
//         if(err) return callback(err,null);
//         else {
//             obj = {total:result.total,rows:result.docs};
//             return callback(null,obj);
//         }
//     });
// };

// Base.prototype.getListBySort = function(page,size,where,sort,callback) {
//     this.model.paginate(where, { page: page, limit: size, sort:sort }, function(err, result) {
//         if(err) return callback(err,null);
//         else {
//             obj = {total:result.total,rows:result.docs};
//             return callback(null,obj);
//         }
//     });
// };

/**
getList(callback)
getList(sort,callback);
getList(where,sort,callback);
getList(where,fields,sort,callback);
getList(page,size,where,sort,callback);
*/
Base.prototype.getList = function() {
	var len = arguments.length;
	if(len == 0) {throw "arguments must be great than 0"; }
	//判断传入参数的个数
	switch(len) {
        case 1:
            if(arguments[0].constructor === Function) {
                var callback = arguments[0];
                this.model.find({},function(err,result) {
                    if(err) return callback(err,null);
                    else callback(null,result);
                });
            }
            break;
		case 2:
			if(arguments[0].constructor === Object && arguments[1].constructor === Function) {
                var sort = arguments[0];
                var callback = arguments[1];
                
                this.model.find({}).sort(sort).exec(function(err,result) {
                    if(err) return callback(err,null);
                    else callback(null,result);
                });
			} else {
				throw "argument is error";
			}
			break;
		case 3:
			if(arguments[0].constructor === Object && arguments[1].constructor === Object && arguments[2].constructor === Function) {
                var where = arguments[0];
                var sort = arguments[1];
                var callback = arguments[2];
                
                this.model.find(where).sort(sort).exec(function(err,result) {
                    if(err) return callback(err,null);
                    else callback(null,result);
                });
			} else {
				throw "argument is error";
			}
			break;
        case 4: 
            //query,fileds,sort,callback
			if(arguments[0].constructor === Object && 
            arguments[1].constructor === Object && 
            arguments[2].constructor === Object && 
            arguments[3].constructor === Function) {
                var query = arguments[0];
                var fileds = arguments[1];
                var sort = arguments[2];
                var callback = arguments[3];
                
                this.model.find(query, fileds).sort(sort).exec(function(err,result){
                    if(err) return callback(err,null);
                    return callback(null,result);
                });
			} else {
				throw "argument is error";
			}
            break;
		case 5:
			if(arguments[0].constructor === Number && 
				arguments[1].constructor === Number && 
				arguments[2].constructor === Object && 
				arguments[3].constructor === Object && 
				arguments[4].constructor === Function
			) {
                var page = arguments[0];
                var size = arguments[1];
                var where = arguments[2];
                var sort = arguments[3];
                var callback = arguments[4];
                
				this.model.paginate(where, { page: page, limit: size, sort:sort}, function(err, result) {
                    if(err) return callback(err,null);
                    else {
                        var obj = {total:result.total,rows:result.docs};
                        return callback(null,obj);
                    }
                });
			} else {
				throw "argument is error";
			}
			break;
		default:
			throw "arguments must be have 2 or 3 or 5";
	}
}
module.exports = Base;