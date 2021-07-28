const { Op } = require('sequelize')
const StudentModel = require('../models/student.model.js')

class StudentsController {
  async list (req, res) {
    await StudentModel
      .findAll({
        order: [
          ['name', 'ASC']
        ]
      })
      .then(students => {
        res.status(200).json({
          data: students
        })
      })
      .catch(error => {
        res.status(500).json({
          error: {
            message: error.message || 'An error occurred while executing the application api.'
          }
        })
      })
  }

  async find (req, res) {
    const { cpf } = req.params

    await StudentModel
      .findByPk(cpf)
      .then(student => {
        res.status(200).json({
          data: student || {}
        })
      })
      .catch(error => {
        res.status(500).json({
          error: {
            message: error.message || 'An error occurred while executing the application api.'
          }
        })
      })
  }

  async search (req, res) {
    const { filter } = req.params

    await StudentModel
      .findAll({
        where: {
          [Op.or]: [{
            cpf: {
              [Op.substring]: filter
            }
          },
          {
            name: {
              [Op.substring]: filter
            }
          },
          {
            email: {
              [Op.substring]: filter
            }
          },
          {
            register: {
              [Op.substring]: filter
            }
          }]
        },
        order: [
          ['name', 'ASC']
        ]
      })
      .then(students => {
        res.status(200).json({
          data: students
        })
      })
      .catch(error => {
        res.status(500).json({
          error: {
            message: error.message || 'An error occurred while executing the application api.'
          }
        })
      })
  }

  async insert (req, res) {
    const studentDTO = req.body

    if (!studentDTO.cpf || !studentDTO.name || !studentDTO.email || !studentDTO.register) {
      res.status(400).json({
        error: {
          message: 'Body missing fields'
        }
      })
    }

    await StudentModel
      .create(studentDTO)
      .then(student => {
        res.status(201).json({ data: student })
      })
      .catch(error => {
        res.status(500).json({
          error: {
            message: error.message || 'An error occurred while executing the application api.'
          }
        })
      })
  }

  async update (req, res) {
    const cpf = req.params.cpf
    const studentDTO = req.body

    if (!studentDTO.cpf || !studentDTO.name || !studentDTO.email || !studentDTO.register) {
      res.status(400).json({
        error: {
          message: 'Body missing fields'
        }
      })
    }

    await StudentModel
      .update(studentDTO, {
        where: { cpf: cpf }
      })
      .then(count => {
        if (count === 1) {
          res.status(200).json({ data: studentDTO })
        } else {
          res.status(200).json({ message: 'Student not found.' })
        }
      })
      .catch(error => {
        res.status(500).json({
          error: {
            message: error.message || 'An error occurred while executing the application api.'
          }
        })
      })
  }

  async delete (req, res) {
    const cpf = req.params.cpf

    await StudentModel
      .destroy({
        where: { cpf: cpf }
      })
      .then(count => {
        if (count === 1) {
          res.status(200).json({ message: 'Student deleted.' })
        } else {
          res.status(200).json({ message: 'Student not found.' })
        }
      })
      .catch(error => {
        res.status(500).json({
          error: {
            message: error.message || 'An error occurred while executing the application api.'
          }
        })
      })
  }
}

module.exports = new StudentsController()
