const express = require('express');
// Cross-Origin-Resource-Sharing
const cors = require('cors');

const app = express();
app.use(cors());

let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false }
];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send(`<h1>${req.protocol}://${req.get('host')}${req.originalUrl}</h1>`));

app.get('/todos', (req, res) => {
  console.log('[GET]');
  res.send(todos);
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('[GET] req.params.id => ', req.params.id);

  res.send(todos.filter(todo => todo.id === +id));
});

app.post('/todos', (req, res) => {
  const { id, content, completed } = req.body;
  console.log('[POST] req.body => ', req.body);

  todos = [{ id, content, completed }, ...todos];
  res.send(todos);
});

app.delete('/todos/:id([0-9]+)', (req, res) => {
  const { id } = req.params;
  console.log('[DELETE] req.params.id => ', req.params.id);

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

app.delete('/todos/completed', (req, res) => {
  console.log('[DELETE] completed');

  todos = todos.filter(todo => !todo.completed);
  res.send(todos);
});

// PATCH : 리스소의 일부를 UPDATE
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('[PATCH] req.params.id => ', req.params.id);

  // id만 있으면 서버가 행동을 해주기 때문에 payload가 필요가 없었다
  // req.body가 undefined면 express API에서 {} 객체를 반환하기 때문에
  // completed에서 error가 발생하지 않았다
  // const { completed } = req.body;
  // console.log('[PATCH] req.body => ', completed);

  // todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));

  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);

  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed } : todo));
  res.send(todos);
});

// PATCH : 리스소의 일부를 UPDATE
// 전체 일괄 갱신
app.patch('/todos', (req, res) => {
  // 변경된 completed 값만 받으면 된다
  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);

  todos = todos.map(todo => ({ ...todo, completed }));
  res.send(todos);
});

app.listen(9000, () => console.log('Simple Rest API Server listening on port 9000'));
