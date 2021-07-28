const Sequelize = require('sequelize')
const dbconfig = require('./mysql')

const StudentModel = require('../models/student.model')

const models = [StudentModel]

class Database {
  constructor () {
    this.init()
  }

  async init () {
    try {
      await new Sequelize(dbconfig).authenticate()
      console.log('Connection to database has been established successfully.')

      this.sequelize = new Sequelize(dbconfig)
      models.map(model => model.init(this.sequelize))

      this.sequelize.sync()
    } catch (error) {
      console.error('Unable to connect to the database:', error.message)
    }
  }
}

module.exports = new Database()
