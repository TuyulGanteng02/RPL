class Database {
    constructor(connection, cursor) {
      this.connection = connection;
      this.cursor = cursor;
    }
  
    savePomodoro(pomodoro) {
      const sql = `
        INSERT INTO pomodoros (
          start,
          end,
          durasi
        ) VALUES (
          '${pomodoro.start}',
          '${pomodoro.end}',
          '${pomodoro.durasi}'
        );
      `;
      this.connection.query(sql);
    }
  
    getPomodoros() {
      const sql = `
        SELECT *
        FROM pomodoros;
      `;
      const results = this.connection.query(sql);
      return results.rows;
    }
  }
  
  class Pomodoro {
    constructor(start, end, durasi) {
      this.start = start;
      this.end = end;
      this.durasi = durasi;
    }
  
    getStart() {
      return this.start;
    }
  
    getEnd() {
      return this.end;
    }
  
    getDurasi() {
      return this.durasi;
    }
  }
  
  class Timer {
    constructor(pomodoro) {
      this.pomodoro = pomodoro;
      this.isRunning = false;
    }
  
    start() {
      this.isRunning = true;
      this.interval = setInterval(() => {
        if (this.pomodoro.getDurasi() === 0) {
          clearInterval(this.interval);
        } else {
          this.pomodoro.setDurasi(this.pomodoro.getDurasi() - 1);
        }
      }, 1000);
    }
  
    stop() {
      this.isRunning = false;
      clearInterval(this.interval);
    }
  
    isRunning() {
      return this.isRunning;
    }
  }
  