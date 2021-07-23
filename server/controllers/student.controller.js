const Student = require('../models/student.model.js')

exports.insert = (req, res) => {
  if (Object.keys(req.body).length !== 4) {
    res.status(400).send({
      error: true,
      message: 'Wrong body format!'
    })
    return
  }

  Student.insertStudent(new Student(req.body), (err, data) => {
    if (err) {
      res.status(500).send({
        error: true,
        message:
          data.message || 'Some error occurred while inserting the student.'
      })
    } else {
      res.status(201).send({
        error: false,
        data
      })
    }
  })
}

exports.update = (req, res) => {
  if (Object.keys(req.body).length !== 4) {
    res.status(400).send({
      error: true,
      message: 'Wrong body format!'
    })
    return
  }

  Student.updateStudent(
    req.params.cpf,
    new Student(req.body),
    (err, data) => {
      if (err) {
        if (data.kind === 'not_found') {
          res.status(404).send({
            error: true,
            message: `Not found student with CPF ${req.params.cpf}.`
          })
        } else {
          res.status(500).send({
            error: true,
            message: data.message || `Error updating student with CPF ${req.params.cpf}.`
          })
        }
      } else {
        res.status(200).send({
          error: false,
          data
        })
      }
    }
  )
}

exports.delete = (req, res) => {
  Student.deleteStudent(req.params.cpf, (err, data) => {
    if (err) {
      if (data.kind === 'not_found') {
        res.status(404).send({
          error: true,
          message: `Not found student with CPF ${req.params.cpf}.`
        })
      } else {
        res.status(500).send({
          error: true,
          message: data.message || `Could not delete student with CPF ${req.params.cpf}`
        })
      }
    } else {
      res.status(200).send({
        error: false,
        message: `Student CPF ${req.params.cpf} was deleted successfully!`
      })
    }
  })
}

exports.list = (req, res) => {
  Student.getStudents((err, data) => {
    if (err) {
      res.status(500).send({
        error: true,
        message:
           data.message || 'Some error occurred while retrieving students.'
      })
    } else {
      res.status(200).send({
        error: false,
        data
      })
    }
  })
}

exports.find = (req, res) => {
  Student.getStudentByCPF(req.params.cpf, (err, data) => {
    if (err) {
      if (data.kind === 'not_found') {
        res.status(404).send({
          error: true,
          message: `Not found student with CPF ${req.params.cpf}.`
        })
      } else {
        res.status(500).send({
          error: true,
          message:
            data.message || 'Some error occurred while retrieving student.'
        })
      }
    } else {
      res.status(200).send({
        error: false,
        data
      })
    }
  })
}

exports.search = (req, res) => {
  Student.searchStudents(req.params.filter, (err, data) => {
    if (err) {
      if (data.kind === 'not_found') {
        res.status(404).send({
          error: true,
          message: `Not found student for the filter ${req.params.filter}.`
        })
      } else {
        res.status(500).send({
          error: true,
          message:
            data.message || 'Some error occurred while retrieving students.'
        })
      }
    } else {
      res.status(200).send({
        error: false,
        data
      })
    }
  })
}
