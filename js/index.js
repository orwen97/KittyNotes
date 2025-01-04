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
const newBtn = document.querySelector("#newBtn");
const btnCancel = document.querySelector(".btnCancel");
const modal = document.querySelector(".modal");


//get back Storage on dom

document.addEventListener("DOMContentLoaded", (event) => {
    const storedTasks = JSON.parse(localStorage.getItem("task")) || [];
    allTasks.push(...storedTasks);
    showTasks.innerHTML = "";
    allTasks.forEach(newTask => {
        showTasks.innerHTML += `<li id = "list-${newTask.id}">
                                    <img src= "${newTask.done ? './assets/check_box.png' : './assets/uncheck-box.png'}" class= "uncheck">
                                    <p>${newTask.description}</p>
                                    <img src="./assets/delete-icon.png" class= "delete">
                                </li>`;
    });
    addUncheckListener();
    deleteListener();
})

//Print of inputs on DOM

btnAdd.addEventListener("click", (event) => {
    event.preventDefault();
    const errorMessage = document.querySelector(".error-message");
    if(inputTask.value.length < 1) {
        errorMessage.style.display = "block";
        return;
    }
    
    errorMessage.style.display = "none";

    let inputTaskValue = inputTask.value;
    const newTask = new Task(inputTaskValue, allTasks.length);
    allTasks.push(newTask);
    form.reset();
    localStorage.setItem("task", JSON.stringify(allTasks));
    showTasks.innerHTML = "";

    allTasks.forEach(newTask => {
        showTasks.innerHTML += `<li id = "list-${newTask.id}">
                                    <img src= "${newTask.done ? './assets/check_box.png' : './assets/uncheck-box.png'}" class= "uncheck">
                                    <p>${newTask.description}</p>
                                    <img src="./assets/delete-icon.png" class= "delete">
                                </li>`;
    });
    addUncheckListener();
    deleteListener();

    form.classList.remove('active');
    modal.classList.remove('active');
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
                    img.src = "./assets/check_box.png";
                    taskFound.done = true;
                } else {
                    img.src = "./assets/uncheck-box.png";
                    taskFound.done = false;
                }
                localStorage.setItem("task", JSON.stringify(allTasks));
            }
        })
    });
}

//delete button function

function deleteListener() {
    const deleted = document.querySelectorAll(".delete");
    
    deleted.forEach(img => {
        img.addEventListener("click", event => {
            const taskId = img.parentElement.id;
            const taskFound = allTasks.find(i => `list-${i.id}` === taskId);
            if(taskFound !== -1) {
                allTasks.splice(taskFound, 1);
                localStorage.setItem("task", JSON.stringify(allTasks));
            }
            img.parentElement.remove();
        })
    })
}

//new button modal pop up

newBtn.addEventListener("click", ()=> {
    form.classList.add('active');
    modal.classList.add('active');
})

btnCancel.addEventListener("click", (e)=> {
    e.preventDefault();
    form.classList.remove('active');
    modal.classList.remove('active');
})

// event listeners nav bar
// const toDo = document.querySelector(".to-do");
// toDo.addEventListener("click", ()=> {
//     toDo.classList.add('active');
// })