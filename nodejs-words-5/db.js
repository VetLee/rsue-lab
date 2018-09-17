var sqlite3 = require('sqlite3').verbose();

class Db {
  constructor() {
    this.db = new sqlite3.Database('words.db', (err) => {
      if (err) { return console.error(err.message); }
    });
  }

  rows(cb = null, orderBy = 'word') {
    let sql = `SELECT * FROM words ORDER BY ${orderBy}`;

    this.db.all(sql, [], (err, rows) => {
      if (err) { throw err; }

      if (typeof cb === "function") {
        cb(rows)
      }
    });
  }

  insertMany(result) {
    let stmt = this.db.prepare("INSERT INTO words VALUES (?, ?)");
    Object.keys(result).forEach(function(word) {
      let matches = result[word];
      stmt.run(word, matches);
    });
    stmt.finalize();
  }

  clear(cb) {
    this.db.run(`DELETE FROM words`, [], function(err) {
      if (err) { return console.error(err.message); }

      if (typeof cb === "function") {
        cb()
      }
    });
  }

  close() {
    this.db.close((err) => {
      if (err) { return console.error(err.message); }
      console.log('Close the database connection.');
    });
  }
}

module.exports = Db;
