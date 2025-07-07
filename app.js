const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'go to shop', completed: true },
  { id: 2, task: 'buy apples', completed: false }
];
let nextId = 3;

app.get('/todos', (req, res) => res.json(todos));


app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  todo ? res.json(todo) : res.status(404).json({ error: 'Todo not found' });
});

app.post('/todos', (req, res) => {
  const newTodo = { id: nextId++, task: req.body.task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  todo.task = req.body.task ?? todo.task;
  todo.completed = req.body.completed ?? todo.completed;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  const [deleted] = todos.splice(index, 1);
  res.json(deleted);
});

module.exports = app;
