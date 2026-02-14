"use strict";

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoRemove = document.querySelector('.todo-remove');

const todoData = JSON.parse(localStorage.getItem('todoData')) || []; // ??? DOes it look good? 

const saveToStorage = function () {
        localStorage.setItem('todoData', JSON.stringify(todoData))
};

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    todoData.forEach((item, idx) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo"> ${item.text} </span>
                 <div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
        `
        if(item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed;
            saveToStorage();
            render();
        })

        li.querySelector('.todo-remove').addEventListener('click', () => {
            todoData.splice(idx, 1);
            saveToStorage();
            render();
        })
    })
}

todoControl.addEventListener('submit', (e)=> {
    e.preventDefault();

    const newTodo = {
        text: headerInput.value,
        completed: false
    }

    if(headerInput.value.trim() === '') return;

    todoData.push(newTodo);
    headerInput.value = '';

    saveToStorage();
    render();
})

render();