const chai = require('chai')
const should = chai.should()
const expect = chai.expect

const chaiArrays = require('chai-arrays')
const chaiHTTP = require('chai-http')
chai.use(chaiArrays)
chai.use(chaiHTTP)

const url = 'http://localhost:3000'

function success (status) {
  let isSuccess = status >= 200 && status < 300 || status === 304
  if (isSuccess) return status
  else return '500 or 404'
}

describe('API status and response', function () {
  let createdId
  let dummy = ['fadly', '123', 'fadly@gmail.com', 'gana', '123', 'gana@yahoo.com']

  describe('GET /auth', function () {
    it('should return /auth information', function (done) {
      chai.request(url)
        .get('/auth')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.a('string')
          res.body.endpoints.should.equalTo([
            '/auth/register',
            '/auth/login',
            '/auth/logout',
            '/auth/users',
            '/auth/users/:id'
          ])
          done()
        })
    })
  })

  describe('POST /auth/users/register', function () {
    it('should return 200 <= status < 300 || status === 304, an object, and req.body.name equal fadly', function (done) {
      chai.request(url)
        .post('/auth/users/register')
        .send({
          username: dummy[0],
          password: dummy[1],
          email: dummy[2]
        })
        .end(function (err, res) {
          createdId = res.body._id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.name.should.equal('fadly')
          done()
        })
    })
  })

  describe('POST /auth/users/login', function () {
    it('should return 200 <= status < 300 || status === 304, an object, and req.body should have property token', function (done) {
      chai.request(url)
        .post('/auth/users/login')
        .send({
          username: dummy[0],
          password: dummy[1]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          req.body.should.have.deep.property('token')
          done()
        })
    })
  })

  describe('GET /auth/users', function () {
    it('return 200 <= status < 300 || status === 304, an object, and req.body[0].username should equal dummy[0]', function (done) {
      chai.request(url)
        .get('/auth/users')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].username.should.equal(dummy[0])
          done()
        })
    })
  })

  describe('PUT /auth/users/update/:id', function () {
    it('should return 200 <= status < 300 || status === 304, an object, and res.body.email should equal dummy[2]', function (done) {
      chai.request(url)
        .put(`/auth/users/${createdId}`)
        .send({
          username: dummy[3],
          password: dummy[4]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.email.should.equal(dummy[2])
          done()
        })
    })
  })

  describe('DELETE /auth/users/delete/:id', function () {
    it('should return 200 <= status < 300 || status === 304, an object, and res.body should have property message', function (done) {
      chai.request(url)
        .delete(`/auth/users/delete/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.have.deep.property('message')
          done()
        })
    })
  })
})
