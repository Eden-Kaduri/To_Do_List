const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadAllEventListeners();
//Loading event listeners
function loadAllEventListeners() {
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Remove All tasks
    clearBtn.addEventListener('click', clearAllTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);

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

    taskInput.value = '';

    e.preventDefault();
}


//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

//Clear tasks
function clearAllTasks(e) {
    if (confirm('Clear all tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
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
