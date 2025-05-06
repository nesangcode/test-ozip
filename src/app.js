const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterCheckbox = document.getElementById("filterCheckbox");

const STORAGE_KEY = "task-list";

let tasks = loadTasks();
let showOnlyUncompleted = false;

renderTasks();

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false,
        createdAt: new Date(),
    });

    saveTasks(tasks);

    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = showOnlyUncompleted
        ? tasks.filter((task) => !task.completed)
        : tasks;

    filteredTasks.forEach((task) => {
        const indexInAllTasks = tasks.indexOf(task);

        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        li.addEventListener("click", () => toggleTask(indexInAllTasks));
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

filterCheckbox.addEventListener("change", () => {
    showOnlyUncompleted = filterCheckbox.checked;
    renderTasks();
});

function saveTasks(tasks) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = window.localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
}
