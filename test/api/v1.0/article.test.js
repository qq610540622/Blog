/*
 var app = require('../../../app');
 var request = require('supertest')(app);
 var should = require("should");
 var support = require("../../support/support");

 /!**
  * api v1.0 测试
  *!/
 describe("api article", function () {
    
     it("article list", function (done) {
          request.get('/api/v1.0/article/list')
             .expect(200, function(err, res) {
                 should.not.exist(err);
                 res.body.status.should.containEql('success');
                 done();
             });
     });
    
     it("article get",function(done) {
         request.get("/api/v1.0/article/get?id=56dbd1ff613ac56429b77575")
             .expect(200,function(err,res) {
                 should.not.exist(err);
                 res.body.status.should.containEql('success');
                 done();
             });
     });
    
     it("article delete",function(done) {
         request.post("/api/v1.0/article/remove")
             .send({
                 id:"56d951af6833a2f002e626d5"
             })
             .expect(200,function(err,res) {
                 should.not.exist(err);
                 res.body.status.should.containEql('success');
                 done();
             });
     });
    
     it("article create",function(done) {
         var model = support.article;
         delete model._id;
         request.post("/api/v1.0/article/create")
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
         request.post("/api/v1.0/article/update")
             .send(model)
             .expect(200,function(err,res) {
                should.not.exist(err);
                res.body.status.should.containEql('success');
                done();
             });
     });
    
    
 });*/
