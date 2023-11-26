// Default Pomodoro Timer Values
let sessionMinutes = 25;
let breakMinutes = 5;
let sessionName = 'Work';
let currentSession = sessionMinutes * 60;
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

function nextSession() {
 if (sessionName === 'Work') {
    sessionName = 'Break';
    currentSession = breakMinutes * 60;
 } else {
    sessionName = 'Work';
    currentSession = sessionMinutes * 60;
 }
 updateDisplay();
 sessionNameElement.textContent = sessionName;
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
 sessionMinutes = 25;
 breakMinutes = 10;
 sessionName = 'Work';
 currentSession = sessionMinutes * 60;
 updateDisplay();
 sessionNameElement.textContent = sessionName;
 taskMode = 'default';
}

function setLong() {
  sessionMinutes = 30;
  breakMinutes = 15;
  sessionName = 'Work';
  currentSession = sessionMinutes * 60;
  updateDisplay();
  sessionNameElement.textContent = sessionName;
  taskMode = 'long';
 }

 function setShort() {
  sessionMinutes = 20;
  breakMinutes = 10;
  sessionName = 'Work';
  currentSession = sessionMinutes * 60;
  updateDisplay();
  sessionNameElement.textContent = sessionName;
  taskMode = 'short';
 }

function setCustom() {
 let session = prompt('Enter session length in minutes:');
 let breakLength = prompt('Enter break length in minutes:');
 if (session && breakLength) {
    sessionMinutes = parseInt(session);
    breakMinutes = parseInt(breakLength);
    sessionName = 'Work';
    currentSession = sessionMinutes * 60;
    updateDisplay();
    sessionNameElement.textContent = sessionName;
    taskMode = 'custom';
 }
}

function init() {
 updateDisplay();
 sessionNameElement.textContent = sessionName;
 if (taskMode === 'default') {
    setDefault();
 } else {
    setCustom();
 }
}

init();
