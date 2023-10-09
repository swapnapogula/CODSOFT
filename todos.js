document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Display existing tasks
    function displayTasks() {
        taskList.innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${tasks[i]}</span>
                <button class="edit" data-index="${i}">Edit</button>
                <button class="delete" data-index="${i}">Delete</button>
            `;
            taskList.appendChild(taskItem);
        }
    }

    displayTasks();

    // Add a new task
    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
            taskInput.value = "";
        }
    });

    // Delete a task
    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        }
    });

    // Edit a task
    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            const index = e.target.getAttribute("data-index");
            const updatedTask = prompt("Edit task:", tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
            }
        }
    });
});
