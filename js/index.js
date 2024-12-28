// this block is about how it started the note-cats idea while i was learning Js

// let task;
// let newTask;
// let allTask = []

// function addTask() {
//     task = prompt("Add a new task for today:");
//     return task;
// };

// do {
//     addTask();
//     allTask.push(task);
//     newTask = prompt("do you want to add another task? (yes / no)").toLowerCase();
// } while(newTask === "yes");
// console.log(allTask)

class Task {
    constructor(description, id) {
            this.description = description
            this.id = id;
            this.done = false;
    }
}

//nodos DOM

let allTasks = [];

const form = document.querySelector("#form");
const inputTask = document.querySelector("#task");
const btnAdd = document.querySelector(".btnAdd");
const showTasks = document.querySelector(".showTasks")
const endBtn = document.querySelector("#endBtn");
const check = document.querySelector(".check");
const deleted = document.querySelector(".delete");

//get back Storage on dom

document.addEventListener("DOMContentLoaded", (event) => {
    const storedTasks = JSON.parse(localStorage.getItem("task")) || [];
    allTasks.push(...storedTasks);
    showTasks.innerHTML = "";
    allTasks.forEach(newTask => {
        showTasks.innerHTML += `<li id = "list-${newTask.id}">
                                    <img src= "${newTask.done ? '/assets/check_box.png' : '/assets/uncheck-box.png'}" class= "uncheck">
                                    <p>${newTask.description}</p>
                                    <img src="/assets/delete-icon.png" class= "delete">
                                </li>`;
    });
    addUncheckListener();
})

//Print of inputs on DOM

btnAdd.addEventListener("click", (event) => {
    event.preventDefault();
    let inputTaskValue = inputTask.value;
    const newTask = new Task(inputTaskValue, allTasks.length);
    allTasks.push(newTask);
    form.reset();
    localStorage.setItem("task", JSON.stringify(allTasks));
    showTasks.innerHTML = "";

    allTasks.forEach(newTask => {
        showTasks.innerHTML += `<li id = "list-${newTask.id}">
                                    <img src= "${newTask.done ? '/assets/check_box.png' : '/assets/uncheck-box.png'}" class= "uncheck">
                                    <p>${newTask.description}</p>
                                    <img src="/assets/delete-icon.png" class= "delete">
                                </li>`;
    });
    addUncheckListener();
});

endBtn.addEventListener("click", (event) => {
    localStorage.clear();
    showTasks.innerHTML = ` `;
    allTasks = [];
})
 // toggle check-uncheck tasks

function addUncheckListener() {
    const uncheck = document.querySelectorAll(".uncheck");

    uncheck.forEach(img => {
        img.addEventListener("click", function(event) {
            const isActive = img.classList.toggle('active');
            const taskId = img.parentElement.id;
            const taskFound = allTasks.find(i => `list-${i.id}` === taskId);
            if(taskFound) {
                if (isActive) {
                    img.src = "/assets/check_box.png";
                    taskFound.done = true;
                } else {
                    img.src = "/assets/uncheck-box.png";
                    taskFound.done = false;
                }
                localStorage.setItem("task", JSON.stringify(allTasks));
            }
        })
    });
}