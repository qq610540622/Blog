var app = require('../../app');
var request = require('supertest')(app);
var should = require("should");
var support = require("../support/support");

describe("admin article", function () {
    before(function (done) {
        support.ready(done);
    });
    it("article list", function (done) {
        request.post('/article/list')
            .send({page:1,rows:10,forumId:"56c582e76d53253c27e92c6d",keywords:""})
            .expect(200,function(err,res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it("article spider", function (done) {
        request.post('/article/spider')
            .send({page:1,rows:10,keywords:"css"})
            .expect(200,function(err,res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it("article create", function (done) {
        var model = support.article;
        delete model._id;
        request.post('/article/create')
            .send(model)
            .expect(200,function(err,res) {
                should.not.exist(err);
                res.text.should.containEql("success");
                done();
            });
    });

    it("article edit", function (done) {
        var model = support.article;
        model.title = "jackjack";
        request.post('/article/create')
            .send(model)
            .expect(200,function(err,res) {
                should.not.exist(err);
                res.text.should.containEql("success");
                done();
            });
    });
    it("article remove", function (done) {
        var model = support.article;
        request.post('/article/remove')
         .send({_id:model._id})
         .expect(200,function(err,res) {
             res.text.should.containEql("success")
             done();
         });
    });

    it("article tags", function (done) {
        request.post('/article/getTag')
         .expect(200,function(err,res) {
            should.not.exist(err);
            res.should.not.equal("error");
            done();
         });
    });


});


