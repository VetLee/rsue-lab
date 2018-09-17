const fs = require('fs');
const Db = require('./db.js')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Какой файл парсим?\n - ', (answer) => {
  file = answer || 'text.txt'

  console.log('Оk, начинаю');

  let db = new Db();

  fs.readFile(file, 'utf8', function(err, content) {
    let words = content.match(/(\w|\s)*\w(?=")|[А-яA-z]+/g);
    db.rows((rows)=> {
      let res = {}
      rows.forEach((row)=> {
        res[row.word] = row.matches
      });

      words.forEach((word) => {
        res[word.toLowerCase()] = (res[word.toLowerCase()] || 0) + 1
      })

      db.clear(()=> {
        db.insertMany(res);
      })
    })
  });

  rl.close();
});
