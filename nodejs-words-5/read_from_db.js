const Db = require('./db.js')
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('По какому полю сортируем вывод: "word", "matches"?\n - ', (answer) => {
  let db = new Db();

  order = answer ? answer : 'matches'

  db.rows((rows)=> {
    rows.forEach((row)=> {
      console.log(row.word, '-', row.matches);
    })
  }, order)

  rl.close();
});
