




var controller = {};

controller.index = function(req,res) {
    res.render("chat",{title:"聊天室"});
}

module.exports = controller;
