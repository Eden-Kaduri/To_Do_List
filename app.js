const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput= document.querySelector('#task');


loadAllEventListeners();
//Loading event listeners
function loadAllEventListeners(){
    form.addEventListener('submit', addTask);
}


function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    //Create li element
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link
    const link=document.createElement('a');
    //Add class to link
    link.className='delete-item secondary-content';
    //Add icon
    link.innerHTML='<i class="fas fa-trash-alt"></i>';
    //Append the link to li
    li.appendChild(link);

    taskList.appendChild(li);

    taskInput.value='';

    e.preventDefault();
}