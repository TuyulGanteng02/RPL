class Guest {
    constructor() {
      this.tasks = [];
    }
  
    visitWebsite() {
      window.location.href = "link pomodoro";
    }
  
    inputTask() {
      const task = prompt("Masukkan task Anda:");
      this.tasks.push(task);
    }
  
    clickStart() {
      this.startActivityTime();
    }
  
    startActivityTime() {
      const timer = setInterval(() => {
        if (this.tasks.length === 0) {
          clearInterval(timer);
        } else {
          this.showNotification("Waktu activity habis!");
          this.continueToRest();
        }
      }, 25 * 60 * 1000);
    }
  
    showNotification(message) {
      const notification = new Notification(message);
      notification.show();
    }
  
    continueToRest() {
      this.startRestTime();
    }
  
    startRestTime() {
      const timer = setInterval(() => {
        if (this.tasks.length === 0) {
          clearInterval(timer);
        } else {
          this.markTaskAsDone();
          this.showNotification("Task selesai!");
        }
      }, 5 * 60 * 1000);
    }
  
    markTaskAsDone() {
      const task = this.tasks.shift();
      const message = `Task "${task}" selesai!`;
      this.showNotification(message);
    }
  }
  
  class System {
    constructor() {
      this.tasks = [];
    }
  
    showHomepage() {
      document.querySelector(".homepage").style.display = "block";
    }
  
    saveTaskInCookies() {
      const tasks = this.tasks;
      const cookies = {
        tasks: JSON.stringify(tasks),
      };
      document.cookie = JSON.stringify(cookies);
    }
  
    isTaskStillAvailable() {
      return this.tasks.length > 0;
    }
  
    redirectToRegister() {
      window.location.href = "link pomodoro";
    }
  }
  
  class LoginUser extends Guest {
    constructor() {
      super();
    }
  
    login() {
      const email = prompt("Masukkan email Anda:");
      const password = prompt("Masukkan password Anda:");
      if (email === "admin" && password === "admin") {
        this.showHomepageAfterLogin();
      } else {
        this.showNotification("Email atau password salah!");
      }
    }
  
    showHomepageAfterLogin() {
      document.querySelector(".login").style.display = "none";
      document.querySelector(".homepage").style.display = "block";
    }
  
    setActivityTimeAndRestTime() {
      const activityTime = prompt("Masukkan waktu activity (menit):");
      const restTime = prompt("Masukkan waktu istirahat (menit):");
      this.activityTime = activityTime;
      this.restTime = restTime;
    }
  }
  