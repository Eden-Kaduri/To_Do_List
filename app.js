const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadAllEventListeners();
//Loading event listeners
function loadAllEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Remove All tasks
    clearBtn.addEventListener('click', clearAllTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);

}

//Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node
        li.appendChild(document.createTextNode(task));
        //Create new link
        const link = document.createElement('a');
        //Add class to link
        link.className = 'delete-item secondary-content';
        //Add icon
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        //Append the link to li
        li.appendChild(link);

        taskList.appendChild(li);
    });
}


function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link
    const link = document.createElement('a');
    //Add class to link
    link.className = 'delete-item secondary-content';
    //Add icon
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    //Append the link to li
    li.appendChild(link);

    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


//Remove from LS function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Clear tasks
function clearAllTasks(e) {
    if (confirm('Clear all tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        clearTasksFromLocalStorage();
    }
}

//Clear ALL tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();

}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}
