const db = require("../config/db")

class Question{
  static CreateTable() {
    return new Promise(function(resolve){
      const sql = `CREATE TABLE questions (
        id INTEGER PRIMARY KEY,
        content TEXT
      )`

      db.run(sql, function(){
        resolve("questions table created")
      })
    })
  }

  static Find(id) {
    const sql = `SELECT * FROM questions WHERE id = (?) LIMIT 1`

    return new Promise(function(resolve) {
      db.get(sql, (id), function(err, resultRow) {
        console.log(`...found ${JSON.stringify(resultRow.content)}`)

        const question = new Question(resultRow.content)

        question.id = resultRow.id

        console.log(question)

        resolve(question)
      })
    })
  }

  constructor(content){
    this.content = content
  }

  insert(){
    const self = this
    const sql = `INSERT INTO questions (content) VALUES (?)`
    return new Promise(function(resolve){
      db.run(sql, [self.content], function(err, result){
        self.id = this.lastID
        resolve(self)
      })
    })
  }
}

module.exports = Question;
