/* eslint-disable no-return-assign */
// eslint-disable-next-line import/extensions
import { ajax } from './ajax-promise.js';

let todos = [];

const $inputTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('.nav');
const $todos = document.querySelector('.todos');
const $completeAll = document.querySelector('#ck-complete-all');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $clearCompleted = document.querySelector('.clear-completed > button');

const render = () => {
  let copyTodos = [...todos];
  let html = '';
  if (document.getElementById('active').className === 'active') {
    copyTodos = copyTodos.filter(todo => todo.completed);
  } else if (document.getElementById('completed').className === 'active') {
    copyTodos = copyTodos.filter(todo => !todo.completed);
  }
  copyTodos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
        <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`;
  });
  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.filter(todo => !todo.completed).length;
};

const getTodos = () => {
  ajax.get('http://localhost:9000/todos')
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const addTodo = content => {
  const toBeAddedTodo = { id: generateId(), content, completed: false };
  console.log(toBeAddedTodo);
  ajax.post('http://localhost:9000/todos', toBeAddedTodo)
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const removeTodo = id => {
  ajax.delete(`http://localhost:9000/todos/${id}`)
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const toggleTodo = id => {
  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  const changedTodo = todos.find(todo => todo.id === +id);
  ajax.patch(`http://localhost:9000/todos/${id}`, changedTodo)
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};


const completeAll = completed => {
  ajax.patch('http://localhost:9000/todos', { completed })
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};


const clearCompleted = () => {
  ajax.delete('http://localhost:9000/todos/completed')
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const controlClearCompleted = () => {
  $completeAll.checked = (todos.every(todo => todo.completed));
};

window.onload = getTodos;

$inputTodo.onkeyup = e => {
  if (e.keyCode !== 13) return;

  $inputTodo.value.trim();
  addTodo($inputTodo.value);
  $inputTodo.value = '';
  render();
};

$todos.onclick = e => {
  if (!e.target.matches('.todos > li > i')) return;

  removeTodo(e.target.parentNode.id);
  render();
};

$nav.onclick = e => {
  if (!e.target.matches('.nav > li') || e.target.className === 'active') return;

  document.querySelector('.active').classList.remove('active');
  e.target.classList.add('active');
  render();
};

$todos.onchange = e => {
  toggleTodo(e.target.parentNode.id);
  controlClearCompleted();
  render();
};

$completeAll.onchange = () => {
  completeAll($completeAll.checked);
  render();
};

$clearCompleted.onclick = () => {
  clearCompleted();
  render();
};
