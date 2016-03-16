// var app = require('../../../app');
// var request = require('supertest')(app);
// var should = require("should"); 
// var support = require("../../support/support"); 

// /**
//  * api v1.1 评论 测试
//  */
// describe("api comment", function () {
    
    
//     it("article get",function(done) {
//         request.get("/api/v1.1/comment/get?id=56e64df0a9c895081f2d690f")
//             .expect(200,function(err,res) {
//                 should.not.exist(err);
//                 res.body.status.should.containEql('success');
//                 done();
//             });
//     });
    
//     it("comment list", function (done) {
//          request.get('/api/v1.1/comment/list')
//             .expect(200, function(err, res) {
//                 should.not.exist(err);
//                 res.body.status.should.containEql('success');
//                 done();
//             });
//     });
    
//     it("article delete",function(done) {
//         request.post("/api/v1.1/comment/remove")
//             .send({
//                 id:"56e64df0a9c895081f2d690f"
//             })
//             .expect(200,function(err,res) {
//                 should.not.exist(err);
//                 res.body.status.should.containEql('success');
//                 done();
//             });
//     });
    
//     it("article create",function(done) {
//         var model = support.article;
//         delete model._id;
//         request.post("/api/v1.1/article/create")
//             .send(model)
//             .expect(200,function(err,res) {
//                should.not.exist(err);
//                res.body.status.should.containEql('success');
//                done(); 
//             });
//     });
    
//     it("article update",function(done) {
//         var model = support.article;
//         model.title = "mocha test";
//         request.post("/api/v1.1/article/update")
//             .send(model)
//             .expect(200,function(err,res) {
//                should.not.exist(err);
//                res.body.status.should.containEql('success');
//                done(); 
//             });
//     });
    
    
// });