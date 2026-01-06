const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const assert = chai.assert;
chai.use(chaiHttp);

let bookId;

suite('Functional Tests', function () {

  suite('POST /api/books', function () {
    test('Create book with title', function (done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'Test Book' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'title');
          assert.property(res.body, '_id');
          bookId = res.body._id;
          done();
        });
    });

    test('Create book without title', function (done) {
      chai.request(server)
        .post('/api/books')
        .send({})
        .end(function (err, res) {
          assert.equal(res.text, 'missing required field title');
          done();
        });
    });
  });

  suite('GET /api/books', function () {
    test('Get all books', function (done) {
      chai.request(server)
        .get('/api/books')
        .end(function (err, res) {
          assert.isArray(res.body);
          done();
        });
    });
  });

  suite('GET /api/books/:id', function () {
    test('Get book by id', function (done) {
      chai.request(server)
        .get('/api/books/' + bookId)
        .end(function (err, res) {
          assert.property(res.body, 'title');
          assert.property(res.body, 'comments');
          done();
        });
    });

    test('Get book with invalid id', function (done) {
      chai.request(server)
        .get('/api/books/invalidid')
        .end(function (err, res) {
          assert.equal(res.text, 'no book exists');
          done();
        });
    });
  });

  suite('POST /api/books/:id', function () {
    test('Add comment', function (done) {
      chai.request(server)
        .post('/api/books/' + bookId)
        .send({ comment: 'Great book!' })
        .end(function (err, res) {
          assert.include(res.body.comments, 'Great book!');
          done();
        });
    });

    test('Add comment without comment', function (done) {
      chai.request(server)
        .post('/api/books/' + bookId)
        .send({})
        .end(function (err, res) {
          assert.equal(res.text, 'missing required field comment');
          done();
        });
    });
  });

  suite('DELETE /api/books/:id', function () {
    test('Delete book', function (done) {
      chai.request(server)
        .delete('/api/books/' + bookId)
        .end(function (err, res) {
          assert.equal(res.text, 'delete successful');
          done();
        });
    });
  });

  suite('DELETE /api/books', function () {
    test('Delete all books', function (done) {
      chai.request(server)
        .delete('/api/books')
        .end(function (err, res) {
          assert.equal(res.text, 'complete delete successful');
          done();
        });
    });
  });

});

