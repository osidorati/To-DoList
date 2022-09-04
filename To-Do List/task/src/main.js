const ul = document.querySelector('ul');
const span = document.querySelectorAll('span');

taskList = []

// получаем из хранилища данные и записываем в массив
if (localStorage.getItem('tasks')) {
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    for(let i=0; i<taskList.length; i++) {
        newTask(taskList[i]);
    }
    console.log(taskList)
}

function newTask(obj) {
    const newItem = document.createElement('li');
    const spanItem = document.createElement("span")

    spanItem.classList.add("task");
    spanItem.append(obj.task);

    const checkInput = document.createElement("input");
    checkInput.setAttribute('type', 'checkbox');
    checkInput.setAttribute('onclick', 'check(this)');
    console.log('obj' + obj.check);
    if ((obj.check)) {
        console.log('obj' + obj.check);
        checkInput.classList.toggle('check');
        spanItem.style.textDecoration = "line-through";
        // for (i in span) {
        //     if (i === obj.task) {
        //         span[i].style.textDecoration = "line-through";
        //     }
        // }

    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute('onclick', "btnDelete(this)");
    const img = document.createElement("img");
    img.setAttribute('src', "red-cross-mark.png");
    deleteBtn.appendChild(img);
    ul.appendChild(newItem).append(checkInput, spanItem, deleteBtn);
}

// ввод новой задачи, событие клика по кнопке "Добавить задачу"
document.getElementById("add-task-button").addEventListener("click", function () {
    let input = document.getElementById("input-task").value;

    //создаем новый элемент списка и его внутренние элмеенты
    const newItem = document.createElement('li');
    //содержание
    const spanItem = document.createElement("span")
    spanItem.classList.add("task");
    spanItem.append(input);

    //чекбокс
    const checkInput = document.createElement("input");
    checkInput.setAttribute('type', 'checkbox');
    checkInput.setAttribute('onclick', 'check(this)');

    //кнопка удаления
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute('onclick', "btnDelete(this)");
    const img = document.createElement("img");
    img.setAttribute('src', "red-cross-mark.png");
    deleteBtn.appendChild(img);


    input = '';

    ul.appendChild(newItem).append(checkInput, spanItem, deleteBtn);

    taskList.push(new Object({task : `${input}`, check : true}));
    console.log(taskList);

    localStorage.setItem("tasks", JSON.stringify(taskList));
})


function btnDelete (obj) {
    obj.parentElement.remove();
    let task = obj.parentElement.querySelector('.task').textContent;
    console.log(task);

    let index = taskList.map(x => {
        return x.task;
    }).indexOf(task);

    taskList.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(taskList));
    console.log(localStorage);
}

function check(obj) {
    let check = document.querySelector("input[type='checkbox']");
    let task = obj.parentElement.querySelector('span');
    task.classList.toggle('check');

    let taskObj = obj.parentElement.querySelector('.task').textContent;
    let index = taskList.map(x => {
        return x.task;
    }).indexOf(taskObj);
    console.log(taskList[index].check);
    let now = !taskList[index].check;
    taskList[index].check = now;
    console.log(taskList[index].check);
    console.log(taskList[index])
}