const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'banco-admin',
  database: 'grupoa'
})

connection.on('error', function (err) {
  if (err) {
    console.log(err.code)
  }
})

module.exports = connection
