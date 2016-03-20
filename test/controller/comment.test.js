

// var app = require('../../app');
// var request = require('supertest')(app);
// var should = require("should");
// var support = require("../support/support");

// describe("admin comment",function() {

//     before(function(done) {
//         support.ready(done);
//     })

//     it("comment list",function(done) {
//         request.post('/comment/getList')
//             .send({page:1,rows:5})
//             .expect(200,function(err,res) {
//                 should.not.exist(err);
//                 res.should.not.equal("error");
//                 done();
//             });
//     });

//     it("comment remove",function(done) {
//         var model = support.comment;
//         request.post('/comment/remove')
//             .send({_id:model._id})
//             .expect(200,function(err,res) {
//                 should.not.exist(err);
//                 res.text.should.containEql("success");
//                 done();
//             });
//     })

// });















