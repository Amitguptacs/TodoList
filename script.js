const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    if (task.completed) taskText.classList.add("completed");

    taskText.addEventListener("click", () => toggleComplete(index));

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = "✏️";
    editBtn.addEventListener("click", () => editTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(buttonGroup);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  const taskItems = document.querySelectorAll(".task-item");
  const taskText = taskItems[index].querySelector(".task-text");

  // Add strikethrough effect before deleting
  taskText.classList.add("completed");

  // Delay deletion for visual effect
  setTimeout(() => {
    tasks.splice(index, 1);
    renderTasks();
  }, 500); // 0.5s delay
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();


