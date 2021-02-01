const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// https://stackoverflow.com/a/6234804
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function processCheck(that) {
  uncheckedCountSpan.innerHTML = +uncheckedCountSpan.innerHTML + (that.checked ? -1 : 1)
}

function newTodo() {
  let todoText = prompt('Enter your TODO here:')
  while (!todoText)
    todoText = prompt('Enter your TODO here:')
  itemCountSpan.innerHTML = +itemCountSpan.innerHTML + 1
  uncheckedCountSpan.innerHTML = itemCountSpan.innerHTML
  list.innerHTML += `<li class="${classNames["TODO_ITEM"]}"><input type="checkbox" id="todo-${itemCountSpan.innerHTML}" value="todo-${itemCountSpan.innerHTML}" onclick="processCheck(this)" /><label for="todo-${itemCountSpan.innerHTML}" class="todo-text">${escapeHtml(todoText)}</label></li>`
}
