/*

Add a task
Edit a task
Mark tasks as done
Delete a task
Clear all tasks

*/
document.addEventListener('DOMContentLoaded', function () {
    const newTaskInput = document.getElementById('new-task');
    const addButton = document.querySelector('button');
    const incompleteTasks = document.getElementById('incomplete-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const clearButton = document.getElementById('clear');

    // Function to create a new task item
    function createTaskElement(taskString) {
        const listItem = document.createElement('li');
        const checkBox = document.createElement('input');
        const label = document.createElement('label');
        const editInput = document.createElement('input');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        checkBox.type = 'checkbox';
        label.innerText = taskString;
        editInput.type = 'text';
        editButton.innerText = 'Edit';
        deleteButton.innerText = 'Delete';

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    // add a new task
    function addTask() {
        const listItem = createTaskElement(newTaskInput.value);
        incompleteTasks.appendChild(listItem);
        bindTaskEvents
        newTaskInput.value = '';
    }

     //  add events to (new task) item
     function bindTaskEvents(taskItem) {
        const checkBox = taskItem.querySelector('input[type=checkbox]');
        const editButton = taskItem.querySelector('button.edit');
        const deleteButton = taskItem.querySelector('button.delete');

        checkBox.addEventListener('change', taskCompleted);
        editButton.addEventListener('click', editTask);
        deleteButton.addEventListener('click', deleteTask);
    }

    //  mark task completed
    function taskCompleted() {
        const listItem = this.parentNode;
        completedTasks.appendChild(listItem);
        bindTaskEvents(listItem);
    }

    // edit task not marked
    function editTask() {
        const listItem = this.parentNode;
        const editInput = listItem.querySelector('input[type=text]');
        const label = listItem.querySelector('label');
        const containsClass = listItem.classList.contains('editMode');

        if (containsClass) {
            label.innerText = editInput.value;
        } else {
            editInput.value = label.innerText;
        }

        listItem.classList.toggle('editMode');
    }

    // delete/clear tasks task
    function deleteTask() {
        const listItem = this.parentNode;
        const ul = listItem.parentNode;
        ul.removeChild(listItem);
    }

    // make add button work
    function addTaskHandler() {
        if (newTaskInput.value !== '') {
            const listItem = createTaskElement(newTaskInput.value);
            incompleteTasks.appendChild(listItem);
            bindTaskEvents(listItem);
            newTaskInput.value = '';
        }
    }


    // edit exisating tasks
    for (let i = 0; i < incompleteTasks.children.length; i++) {
        bindTaskEvents(incompleteTasks.children[i]);
    }

    for (let i = 0; i < completedTasks.children.length; i++) {
        bindTaskEvents(completedTasks.children[i]);
    }
    // Event listeners
    addButton.addEventListener('click', addTaskHandler);
    newTaskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    });

    clearButton.addEventListener('click', function () {
        completedTasks.innerHTML = '';
    });
});