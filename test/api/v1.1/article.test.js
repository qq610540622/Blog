 var app = require('../../../app');
 var request = require('supertest')(app);
 var should = require("should");
 var support = require("../../support/support");

 /**
  * api v1.1 测试
  */
 describe("api article", function () {
     before(function (done) {
         support.ready(done);
     });

     it("article list", function (done) {
          request.get('/api/v1.1/article/list')
             .expect(200, function(err, res) {
                 should.not.exist(err);
                 done();
             });
     });

     it("article get",function(done) {
         var model = support.article;
         request.get("/api/v1.1/article/get?id="+model._id)
             .expect(200,function(err,res) {
                 should.not.exist(err);
                 res.body.status.should.containEql('success');
                 done();
             });
     });

     it("article create",function(done) {
         var model = support.article;
         request.post("/api/v1.1/article/create")
             .send(model)
             .expect(200,function(err,res) {
                should.not.exist(err);
                res.body.status.should.containEql('success');
                done();
             });
     });

     it("article update",function(done) {
         var model = support.article;
         model.title = "mocha test";
         request.post("/api/v1.1/article/update")
             .send(model)
             .expect(200,function(err,res) {
                 should.not.exist(err);
                 res.body.status.should.containEql('success');
                 done();
             });
     });

     it("article delete",function(done) {
         var model = support.article;
         request.post("/api/v1.1/article/remove")
             .send({
                 id:model._id
             })
             .expect(200,function(err,res) {
                 should.not.exist(err);
                 res.body.status.should.containEql('success');
                 done();
             });
     });

 });