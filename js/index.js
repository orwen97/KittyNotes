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
    constructor(description) {
            this.description = description,
            this.done = false;
    }
    taskDone() {
        this.done = true;
    }
}

//nodos DOM

let allTasks = [];

const form = document.querySelector("#form");
const inputTask = document.querySelector("#task");
const btnAdd = document.querySelector(".btnAdd");
const showTasks = document.querySelector(".showTasks")
const endBtn = document.querySelector("#endBtn");

//get back Storage on dom

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("task")) || [];
    allTasks.push(...storedTasks);
    showTasks.innerHTML = "";
    allTasks.forEach(task => {
        showTasks.innerHTML += `<li>${task.description}</li>`;
    });
})

//Print of inputs on DOM

btnAdd.addEventListener("click", (event) => {
    event.preventDefault();
    let inputTaskValue = inputTask.value;
    const newTask = new Task(inputTaskValue);
    allTasks.push(newTask);
    form.reset();
    localStorage.setItem("task", JSON.stringify(allTasks));
    showTasks.innerHTML = "";
    // console.log(`Your task is: ${inputTaskValue}`);
    // console.log(allTasks);

    allTasks.forEach(newTask => {
        showTasks.innerHTML += `<li id = "list">
                                    <img src="/assets/uncheck-box.png">
                                    <p>${newTask.description}</p>
                                    <img src="/assets/delete-icon.png">
                                </li>`;
    });
});

endBtn.addEventListener("click", (event) => {
    localStorage.clear();
    showTasks.innerHTML = ` `;
    allTasks = [];
})