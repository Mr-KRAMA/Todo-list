let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = ""; // Clear input field
        updateTasksList();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear list

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})">
                <p>${task.text}</p>
            </div>
            <div class="icons">
              <button onclick="editTask(${index})" > <img src="./img/edit.png" alt="Edit" /></button>
             <button onclick="deleteTask(${index})"><img src="./img/bin.png" alt="Delete" /></button>
            </div>
        </div>`;
    

        taskList.appendChild(listItem);
    });

    updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasksList();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

const updateStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Update progress bar
    const progressBar = document.getElementById("progress");
    progressBar.style.width = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : "0%";

    // Update stats text
    const statsText = document.getElementById("number");
    statsText.textContent = `${completedTasks} / ${totalTasks}`;
};

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
});
