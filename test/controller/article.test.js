 var app = require('../../app');
 var request = require('supertest')(app);
 var should = require("should");
 var support = require("../support/support");

 describe("admin article", function () {
     before(function (done) {
         support.ready(done);
     });

     it("article list", function (done) {
         var model = support.forum;
         request.post('/admin/article/list')
             .send({page:1,rows:10,forumId:model._id,keywords:""})
             .expect(200,function(err,res) {
                 should.not.exist(err);
                 should.exist(res);
                 done();
             });
     });

     it("article spider", function (done) {
         request.post('/admin/article/spider')
             .send({page:1,rows:10,keywords:"css"})
             .expect(200,function(err,res) {
                 should.not.exist(err);
                 should.exist(res);
                 done();
             });
     });

     it("article remove", function (done) {
         var model = support.article;
         request.post('/admin/article/remove')
          .send({_id:model._id})
          .expect(200,function(err,res) {
              res.text.should.containEql("success")
              done();
          });
     });

     it("article tags", function (done) {
         request.post('/admin/article/getTag')
          .expect(200,function(err,res) {
             should.not.exist(err);
             res.should.not.equal("error");
             done();
          });
     });
 });


