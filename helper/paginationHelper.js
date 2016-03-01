/**
 * 分页实体
 * @param page 当前页
 * @param redirectUrl 跳转地址
 * @param obj   分页数据{total:11,rows:[object,object...]}
 */
var pagination = function(forumId,keywords,page,size,redirectUrl,obj) {
    this.page = page;
    this.size = size;
    this.keywords = keywords;
    this.redirectUrl = redirectUrl;
    this.obj = obj;
    this.forumId = forumId;

    this.pageCount = 0;

    this.first = {};
    this.itemList = [];
    this.end = {};

    _self = this;
    _self.init();
    console.log(_self);
}


pagination.prototype = {
    constructor:pagination,
    init:function() {
        _self.pageCount = Math.ceil(_self.obj.total/_self.size);
        if(_self.pageCount>0) {
            _self.getItemList();
            _self.getFirst();
            _self.getEnd();
        }
    },
    getItemList:function() {

        for(var i=0,len = _self.pageCount; i< len; i++) {
            var temp = {};
            temp.index = i+1;
            temp.class = (i+1) == _self.page ? "active":"";
            temp.url = _self.redirectUrl+"?forumId="+ _self.forumId +"&keywords="+ _self.keywords +"&page="+(i+1);
            _self.itemList.push(temp);
        }

        /*var showPageCount = 6;
        var bothShowBtnCount = 3;
        if(_self.pageCount > bothShowBtnCount) {
            if(_self.page>bothShowBtnCount) {
                for(var i=0,len = showPageCount; i< len; i++) {
                    var temp = {};
                    temp.index = i+1;
                    temp.class = (i+1) == _self.page ? "active":"";
                    temp.url = _self.redirectUrl+"?forumId="+ _self.forumId +"&keywords="+ _self.keywords +"&page="+(i+1);
                    _self.itemList.push(temp);
                }
            } else if(_self.page == bothShowBtnCount) {

            } else if(_self.page < bothShowBtnCount) {

            }
        } else {
            for(var i=0,len = _self.pageCount; i< len; i++) {
                var temp = {};
                temp.index = i+1;
                temp.class = (i+1) == _self.page ? "active":"";
                temp.url = _self.redirectUrl+"?forumId="+ _self.forumId +"&keywords="+ _self.keywords +"&page="+(i+1);
                _self.itemList.push(temp);
            }
        }*/
    },
    getFirst:function() {
        _self.first.class = _self.page == 1 ? "disabled" : "";
        var url = _self.redirectUrl+"?forumId="+ _self.forumId +"&keywords="+ _self.keywords +"&page=1";
        _self.first.url = _self.page > 1 ? url :"";
    },
    getEnd:function() {
        var pageCount = _self.pageCount;
        _self.end.class = pageCount == _self.page ? "disabled" : "";

        var url = _self.redirectUrl+"?forumId="+ _self.forumId +"&keywords="+ _self.keywords +"&page="+pageCount;
        _self.end.url = _self.page < pageCount ? url : "";
    },
    getPageCount:function() {
        return Math.ceil(_self.obj.total/this.size);
    }
};

module.exports = pagination;




