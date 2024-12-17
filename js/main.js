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
    constructor(time, description) {
        this.time = time,
            this.description = description,
            this.done = false;
    }
    taskDone() {
        this.done = true;
    }
}

//nodos DOM

let allTasks = [];

let form = document.querySelector("#form");
let inputTask = document.querySelector("#task");
let inputTime = document.querySelector("#time");
let btnAdd = document.querySelector(".btnAdd");
const showTasks = document.querySelector(".showTasks")
let endBtn = document.querySelector("#endBtn");

//get back Storage on dom

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("task")) || [];
    allTasks.push(...storedTasks);
    showTasks.innerHTML = "";
    allTasks.forEach(task => {
        showTasks.innerHTML += `<li>${task.description} at ${task.time}hs</li>`;
    });
})

//Print of inputs on DOM

btnAdd.addEventListener("click", (event) => {
    event.preventDefault();
    let inputTaskValue = inputTask.value;
    let inputTimeValue = inputTime.value;
    const newTask = new Task(inputTimeValue, inputTaskValue);
    allTasks.push(newTask);
    form.reset();
    localStorage.setItem("task", JSON.stringify(allTasks));
    showTasks.innerHTML = "";
    // console.log(`Your task is: ${inputTaskValue} at: ${inputTimeValue}hs`);
    // console.log(allTasks);

    allTasks.forEach(newTask => {
        showTasks.innerHTML += `<li id = "list">${newTask.description} at ${newTask.time}hs</li>`;
    });
});

//function for finished tasks

showTasks.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("done");

        const taskIndex = [...showTasks.children].indexOf(event.target);

        allTasks[taskIndex].done = !allTasks[taskIndex].done;
        localStorage.setItem("task", JSON.stringify(allTasks));

    }
});

endBtn.addEventListener("click", (event) => {
    localStorage.clear();
    showTasks.innerHTML = ` `;
    allTasks = [];
})