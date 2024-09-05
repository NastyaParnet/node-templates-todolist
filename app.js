require('env');
const parser = require('body-parser');
const express = require("express");
const ejs = require("ejs");
const ejsLayouts = require("express-ejs-layouts");

const app = express();

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.set('view engine', 'ejs');

app.use(ejsLayouts);

const tasks = [];

app.get('/', (req, res) => {
  res.render('layout', {tasks: tasks});
});

app.post('/add', (req, res) => {
  tasks.push({
    name: req.body.task,
    done: false
  })
  res.redirect('/');
});

app.post('/update/:index', (req, res) => {
  const index = req.params.index;
  const updatedTask = {
    ...tasks[index],
    done: !tasks[index].done
  }
  tasks.splice(index, 1, updatedTask);
  res.redirect('/');
});


app.post('/delete/:index', (req, res) => {
  tasks.splice(req.params.index, 1);
  res.redirect('/');
});

const server = app.listen(process.env.PORT || 3000);

module.exports = server;
