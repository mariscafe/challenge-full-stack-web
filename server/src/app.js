const express = require('express')
const cors = require('cors')

const studentsRouter = require('./routes/api/students')

class App {
  constructor (Database) {
    this.database = new Database()
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  routes () {
    // simple route
    this.app.get('/', (req, res) => {
      res.status(200).json({
        message: 'Welcome to the application!'
      })
    })

    this.app.use('/api/students', studentsRouter)
  }
}

module.exports = App
