/**
 * Created by Administrator on 2016-02-19.
 */
function htmlEncode(str)
{
    var    s    =    "";
    if    (str.length    ==    0)    return    "";
    s    =    str.replace(/&/g, "&amp;");
    s    =    s.replace(/</g, "&lt;");
    s    =    s.replace(/>/g, "&gt;");
    s    =    s.replace(/ /g, "&nbsp;");
    s    =    s.replace(/\'/g,"&apos;");
    s    =    s.replace(/\"/g, "&quot;");
    s    =    s.replace(/\n/g, "<br>");
    return    s;
}
function htmlDecode(str)
{
    var s = "";
    if(str.length    ==    0)    return    "";
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&apos;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}


function mySubstr(obj) {
    $(obj).find(".article-content-box").each(function(i,e) {
        if($(e).text().trim().length>100) {
            $(e).text($(e).text().substr(0,100));
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




function convertTime(timestramp) {
    var res = "";
    if(timestramp && typeof timestramp == "number") {
        var time = new Date(timestramp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        month = month < 10 ? '0' + month : month;
        var date = time.getDate();
        res = year+"-"+month+"-"+date;
    }
    return res;
}

//判断用户是否登录
function isLogin() {
    var res = false;
    $.ajax({
        type:"post",
        dataType:"text",
        url:"/user/isLogin",
        async:false,
        success:function(data) {
            if(data && data == "success") {
                res = true;
            }
        }
    });
    return res;
}



//模态框垂直居中
function centerModals($element) {
    var $modals;
    if ($element.length) {
        $modals = $element;
    } else {
        $modals = $(".modal" + ':visible');
    }
    $modals.each( function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}





