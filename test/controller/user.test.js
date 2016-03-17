var app = require('../../app');
var request = require('supertest')(app);
var should = require("should");
var support = require("../support/support");

describe("admin user", function () {
    before(function (done) {
        support.ready(done);
    });

    it("user list", function (done) {
         request.post('/user/getList')
             .expect(200)
             .end(done);
    });

    it("user update", function (done) {
        var model = support.user;
         request.post('/user/update')
             .send({_id:model._id, status:model.status})
             .expect(200,function(err,res) {
                 res.text.should.containEql("success")
                 done();
             });
    });

    it("user remove", function (done) {
        var model = support.user;
        request.post('/user/remove')
            .send({_id:model._id})
            .expect(200,function(err,res) {
                res.text.should.containEql("success")
                done();
            });
    });
});
