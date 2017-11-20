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

  static Find(id){
		const sql = "select * FROM questions WHERE id = ?"
		const self = this //need this?
    //
		return new Promise(function(resolve){
		    db.get(sql, [id], function(err, results){ //err, results? yes. //want tp ise db.get
				const question = new Question(results.content) //only want .content !!!
				question.id = results.id // not self.id = this.LastID. this is for previous ex.
				resolve(question)
		 	})
		})
	}
}

module.exports = Question;
