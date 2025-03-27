const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');

router.get('/new', (req, res) => {
  return res.render('new');
});

router.post('/', (req, res) => {
  const userId = req.user._id;
  const name = req.body.name;
  return Todo.create({ name, userId })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => console.error(error));
});

router.get('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => {
      res.render('detail', { todo });
    })
    .catch((error) => console.error(error));
});

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.error(error));
});

router.put('/:id', (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const { name, isDone } = req.body;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === 'on';
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((error) => console.error(error));
});

router.delete('/:id', (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      if (!todo) {
        throw new Error('todo not found');
      }
      return todo.deleteOne();
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});

module.exports = router;
