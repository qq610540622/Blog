var app = require('../../app');
var request = require('supertest')(app);
var should = require("should");
var support = require("../support/support");

describe("admin forum",function() {

    before(function(done) {
        support.ready(done);
    })

    it("forum list",function(done) {
        request.post('/forum/list')
            .expect(200,function(err,res) {
                should.not.exist(err);
                res.should.not.equal("error");
                done();
            });
    });

    it("form create", function(done) {
        var model = support.forum;
        request.post('/forum/create')
            .send(model)
            .expect(200,function(err,res) {
                should.not.exist(err);
                res.text.should.containEql("success");
                done();
            });
    });

    it("form remove",function(done) {
        var model = support.forum;
        request.post('/forum/remove')
            .send({_id:model._id})
            .expect(200,function(err,res) {
                should.not.exist(err);
                res.text.should.containEql("success");
                done();
            });
    })

    it("forum edit",function(done) {
        var model = support.forum;
        model.sortId = 100;
        request.post("/forum/edit")
            .send(model)
            .expect(200,function(err,res) {
                should.not.exist(err);
                res.text.should.containEql("success");
                done();
            })
    })

});
