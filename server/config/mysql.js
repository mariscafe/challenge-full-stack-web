const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

connection.on('error', function (err) {
  if (err) {
    console.log(err.code)
  }
})

module.exports = connection
