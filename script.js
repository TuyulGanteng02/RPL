let minutes = 60;
let seconds = 0;
let isRunning = false;
let timer;
let tasks = [];
let currentTaskIndex = 0;

function updateCurrentTask() {
  const taskNameElement = document.getElementById("task-name");
  if (tasks.length > 0) {
    taskNameElement.innerText = `Tugas saat ini: ${tasks[currentTaskIndex]}`;
  }
}

function updateDisplay() {
  document.getElementById("waktu").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  updateCurrentTask();
}

function startTimer() {
  if (tasks.length === 0) {
    alert("Tidak ada tugas. Silakan tambahkan tugas terlebih dahulu.");
    return;
  }
  
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(function() {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        isRunning = false;
        alert("Pomodoro Timer Selesai!");
      } else if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }  
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  updateDisplay();
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = 60;
  seconds = 0;
  updateDisplay();
}

function addTask() {
  const taskInput = document.getElementById("task");
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push(task);
    taskInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.innerText = `${index + 1}. ${task}`;
    taskItem.onclick = () => setCurrentTask(index);
    taskList.appendChild(taskItem);
  });
}

function setCurrentTask(index) {
  currentTaskIndex = index;
}

function editTask() {
  const newTask = prompt("Edit Tugas:", tasks[currentTaskIndex]);
  if (newTask !== null) {
    tasks[currentTaskIndex] = newTask;
    displayTasks();
  }
}

function deleteTask() {
  tasks.splice(currentTaskIndex, 1);
  displayTasks();
}

function skipSession() {
  clearInterval(timer);
  isRunning = false;
  minutes = 60;
  seconds = 0;
  updateDisplay();
  if (tasks.length > 0) {
    currentTaskIndex = (currentTaskIndex + 1) % tasks.length;
  }
  startTimer();
  displayTasks();
}