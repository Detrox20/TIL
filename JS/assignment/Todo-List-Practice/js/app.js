// State
let todos = [];

const $input = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $allCompletion = document.querySelector('#ck-complete-all');
const $btn = document.querySelector('.btn');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

const render = () => {
  let html = '';
  todos.forEach(todo => {
    html += `<li id="${todo.id}" class="todo-item">
    <input id="ck-${todo.id}" class="checkbox" type="checkbox" ${todo.completed ? 'checked' : ''}>
    <label for="ck-${todo.id}">${todo.content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  });
  $todos.innerHTML = html;
};

const getId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const addTodo = content => {
  todos = [{ id: getId(), content, completed: false }, ...todos];
  $activeTodos.innerHTML = todos.length;
  render();
};

const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== +id);
  render();
};

const toggleTodo = id => {
  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  render();
};

const countTodos = () => {
  const $countCompletion = todos.filter(todo => todo.completed).length;
  $completedTodos.innerHTML = $countCompletion;
  render();
};

const allCompletionTodo = () => {
  todos = !(todos.every(todo => todo.completed))
    ? todos.map(todo => ({ ...todo, completed: true }))
    : todos.map(todo => ({ ...todo, completed: false }));
  render();
  countTodos();
};

const removeAllCompletion = () => {
  todos = todos.filter(todo => !todo.completed);
  render();
};

const leftItems = () => {
  $activeTodos.innerHTML = todos.length;
};

$input.onkeyup = e => {
  if (e.keyCode !== 13) return;
  $input.value.trim();
  addTodo($input.value);
  $input.value = '';
};

$todos.onclick = e => {
  if (!e.target.matches('.todos > li > i')) return;
  removeTodo(e.target.parentNode.id);
};

$todos.onchange = e => {
  toggleTodo(e.target.parentNode.id);
  countTodos();
};

$allCompletion.onchange = e => {
  allCompletionTodo(e.target.parentNode.id);
};

$btn.onclick = () => {
  removeAllCompletion();
  countTodos();
  leftItems();
};
