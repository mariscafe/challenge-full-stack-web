const Sequelize = require('sequelize')
const dbconfig = require('./mysql')

const StudentModel = require('../models/student.model')

const models = [StudentModel]

class Database {
  constructor () {
    this.init()
  }

  async init () {
    try{
      this.sequelize = await new Sequelize(dbconfig)
      models.map(model => model.init(this.sequelize))

      this.sequelize.sync()

      console.log('Connection has been established successfully.')
    }
    catch(error){
      console.error('Unable to connect to the database:', error)
    }
  }
}

module.exports = Database
