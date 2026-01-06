'use strict';
const Book = require('../models/Book');

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      const books = await Book.find({});
      res.json(books.map(b => ({
        _id: b._id,
        title: b.title,
        commentcount: b.comments.length
      })));
    })
    .post(async (req, res) => {
      if (!req.body.title) return res.send('missing required field title');
      const book = await Book.create({ title: req.body.title });
      res.json({ _id: book._id, title: book.title });
    })
    .delete(async (req, res) => {
      await Book.deleteMany({});
      res.send('complete delete successful');
    });

  app.route('/api/books/:id')
    .get(async (req, res) => {
      const book = await Book.findById(req.params.id);
      if (!book) return res.send('no book exists');
      res.json({
        _id: book._id,
        title: book.title,
        comments: book.comments
      });
    })
    .post(async (req, res) => {
      if (!req.body.comment) return res.send('missing required field comment');
      const book = await Book.findById(req.params.id);
      if (!book) return res.send('no book exists');
      book.comments.push(req.body.comment);
      await book.save();
      res.json({
        _id: book._id,
        title: book.title,
        comments: book.comments
      });
    })
    .delete(async (req, res) => {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) return res.send('no book exists');
      res.send('delete successful');
    });
};
