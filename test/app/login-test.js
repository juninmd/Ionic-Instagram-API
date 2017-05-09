var request = require('supertest');
var app = require('../../app');
var should = require("should");

describe("--= Login =--", () => {

    it("Login -> RE_COUTO -> OK", (done) => {
        request(app)
            .get("/login")
            .set('user.login', 'RE_COUTO')
            .expect("Content-type", /json/)
            .set('user.password', '123')
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.have.property('token');
                res.body.token.should.not.equal(null);
                done();
            });
    });
});