const mainTodoContainer = document.querySelector('#todos');
const input = document.querySelector('.todo-input');
const addingButton = document.querySelector('.add-item');

const editTodo = document.querySelector('.edit-todo');
const modalInput = document.querySelector('.modal-input');
const saveChangesBtn = document.querySelector('.save-changes');

const clearBtn = document.querySelector('.clear-btn');

addingButton.addEventListener('click', () => {
  if (input.value.trim()) {
    // ul tag
    const ulTag = document.createElement('ul');
    ulTag.classList.add('todo__listContainer');

    // div tag
    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');

    // li tag
    const liTag = document.createElement('li');
    liTag.classList.add('todo-item');
    liTag.innerHTML = input.value;

    // _todo button container
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('todo__buttonContainer');

    // completed button
    const completedButton = document.createElement('button');
    completedButton.classList.add('completed');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";

    // edit button
    const editButton = document.createElement('button');
    editButton.classList.add('editBtn');
    editButton.innerHTML = "<i class='far fa-edit'></i>";

    // delete button
    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.classList.add('trash');
    deleteTodoButton.innerHTML = "<i class='fas fa-trash'></i>";

    // append elements into each other
    ulTag.appendChild(todoList);
    todoList.appendChild(liTag);
    todoList.appendChild(buttonDiv);
    buttonDiv.appendChild(completedButton);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteTodoButton);

    // append all elements to main div
    mainTodoContainer.appendChild(ulTag);

    // trash button logic
    todoList.addEventListener('click', (e) => {
      const item = e.target;
      const btnContainer = item.parentElement;
      const _todoList = btnContainer.parentElement;
      const _todo = _todoList.parentElement;
      const _todoItem = _todoList.firstChild;

      if (item.classList[0] === 'completed') {
        _todoItem.classList.toggle('line-through');
        console.log(item.parentElement);
      }
      if (item.classList[0] === 'trash') {
        _todoList.classList.add('slide');
        _todo.addEventListener('transitionend', () => {
          todoList.remove();
        });
      }
      if (item.classList[0] === 'editBtn') {
        const blur = document.getElementById('blur');
        let modalInputValue = _todoItem.innerText;

        editTodo.classList.add('show-modal');
        modalInput.value = `${modalInputValue}`;

        // save changes
        saveChangesBtn.addEventListener('click', (e) => {
          e.preventDefault();
          newValue = modalInput.value;
          editTodo.classList.remove('show-modal');
          _todoItem.innerText = `${modalInput.value}`;
        });
      }
    });

    const allTodos = document.querySelectorAll('ul');

    clearBtn.addEventListener('click', () => {
      allTodos.forEach((todo) => {
        todo.remove();
      });
    });

    // clear input value
    input.value = '';
  } else if (input.value === '') {
    alert('Please fill the input field with a task!');
  }
});
