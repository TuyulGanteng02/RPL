// Default Pomodoro Timer Values
let workMinutes = 25;
let breakMinutes = 10;
let longBreakMinutes = 15;
let sessionName = 'Work';
let currentSession = workMinutes * 60;
let taskMode = 'default';

// DOM Elements
let timeElement = document.getElementById('time');
let sessionNameElement = document.getElementById('session-name');
let taskNameElement = document.getElementById('task-name');
let tasksElement = document.getElementById('tasks');
let customFormElement = document.getElementById('custom-form');

// Task List
let tasks = [];

// Timer Controls
let intervalId;

function updateDisplay() {
 let minutes = Math.floor(currentSession / 60);
 let seconds = currentSession % 60;
 timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function start() {
 if (!intervalId) {
    intervalId = setInterval(() => {
      currentSession--;
      updateDisplay();
      if (currentSession <= 0) {
        pause();
        nextSession();
      }
    }, 1000);
 }
}

function pause() {
 clearInterval(intervalId);
 intervalId = null;
}

function addTask() {
 let taskName = prompt('Enter task name:');
 if (taskName) {
    let taskElement = document.createElement('p');
    taskElement.textContent = taskName;
    tasksElement.appendChild(taskElement);
    tasks.push(taskName);
 }
}

function setDefault() {
 workMinutes = 25;
 breakMinutes = 10;
 longBreakMinutes = 15;
 sessionName = 'Work';
 currentSession = workMinutes * 60;
 updateDisplay();
 sessionNameElement.textContent = sessionName;
 taskMode = 'default';
}

function setLong() {
 workMinutes = 30;
 breakMinutes = 15;
 longBreakMinutes = 20;
 sessionName = 'Work';
 currentSession = workMinutes * 60;
 updateDisplay();
 sessionNameElement.textContent = sessionName;
 taskMode = 'long';
}

function setShort() {
 workMinutes = 20;
 breakMinutes = 5;
 longBreakMinutes = 10;
 sessionName = 'Work';
 currentSession = workMinutes * 60;
 updateDisplay();
 sessionNameElement.textContent = sessionName;
 taskMode = 'short';
}

function setCustom() {
 let work = prompt('Work minutes:');
 let breakLength = prompt('Break minutes:');
 let longBreakLength = prompt('Long break minutes:');
 if (work && breakLength) {
    workMinutes = parseInt(work);
    breakMinutes = parseInt(breakLength);
    longBreakMinutes = parseInt(longBreakLength);
    sessionName = 'Work';
    currentSession = workMinutes * 60;
    updateDisplay();
    sessionNameElement.textContent = sessionName;
    taskMode = 'custom';
 }
}

function prevSession() {
  if (sessionName === 'Work') {
    sessionName = 'Long Break';
    currentSession = longBreakMinutes * 60;
  } else if (sessionName === 'Break') {
    sessionName = 'Work';
    currentSession = workMinutes * 60;
  } else if (sessionName === 'Long Break') {
    sessionName = 'Break';
    currentSession = breakMinutes * 60;
  }
  updateDisplay();
  sessionNameElement.textContent = sessionName;
}

function nextSession() {
 if (sessionName === 'Work') {
    sessionName = 'Break';
    currentSession = breakMinutes * 60;
 } else if (sessionName === 'Break') {
    sessionName = 'Long Break';
    currentSession = longBreakMinutes * 60;
 } else if (sessionName === 'Long Break') {
    sessionName = 'Work';
    currentSession = workMinutes * 60;
 }
 updateDisplay();
 sessionNameElement.textContent = sessionName;
}

function prevTask() {
  pause();
  if (tasks.length > 0) {
    tasks.pop();
    updateTasks();
  }
}
 
function skipTask() {
  pause();
  tasks.shift();
  updateTasks();
}
 
function updateTasks() {
  tasksElement.innerHTML = '';
  tasks.forEach(taskName => {
    let taskElement = document.createElement('p');
    taskElement.textContent = taskName;
    tasksElement.appendChild(taskElement);
  });
}

function init() {
  updateDisplay();
  sessionNameElement.textContent = sessionName;
  updateTasks();
  if (taskMode === 'default') {
    setDefault();
  } else {
    setCustom();
  }
}

init();
