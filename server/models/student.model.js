const db = require('../config/mysql.js')

class Student {
  constructor (student) {
    this.cpf = student.cpf
    this.name = student.name
    this.email = student.email
    this.register = student.register
  }

  static insertStudent (student, result) {
    db.query('INSERT INTO tbl_students SET ?', student, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(true, err)
        return
      }

      console.log('inserted student: ', { cpf: res.cpf, ...student })
      result(false, { cpf: res.cpf, ...student })
    })
  }

  static updateStudent (cpf, student, result) {
    db.query(
      'UPDATE tbl_students SET ? WHERE cpf = ?',
      [student, cpf], (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(true, err)
          return
        }

        if (res.affectedRows === 0) {
          // Not found student with the CPF
          result(true, { kind: 'not_found' })
          return
        }

        console.log('updated customer: ', { cpf: res.cpf, ...student })
        result(false, { cpf: res.cpf, ...student })
      })
  }

  static deleteStudent (cpf, result) {
    db.query('DELETE FROM tbl_students WHERE cpf = ?', cpf, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(true, err)
        return
      }

      if (res.affectedRows === 0) {
        // Not found student with the CPF
        result(true, { kind: 'not_found' })
        return
      }

      console.log('deleted customer with CPF: ', cpf)
      result(false, res)
    })
  }

  static getStudents (result) {
    db.query('SELECT * FROM tbl_students ORDER BY name ASC', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(true, err)
        return
      }

      console.log('students: ', res)
      result(false, res)
    })
  }

  static getStudentByCPF (cpf, result) {
    db.query('SELECT * FROM tbl_students WHERE cpf = ?', cpf, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(true, err)
        return
      }

      if (res.length === 0) {
        // Not found student with the CPF
        result(true, { kind: 'not_found' })
        return
      }

      console.log('students: ', res)
      result(false, res)
    })
  }

  static searchStudents (filter, result) {
    db.query(
      `SELECT * FROM tbl_students WHERE cpf LIKE '%${filter}%' OR name LIKE '%${filter}%' OR email LIKE '%${filter}%' OR register LIKE '%${filter}%' ORDER BY name ASC`,
      (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(true, err)
          return
        }

        if (res.length === 0) {
          // Not found student for the filter
          result(true, { kind: 'not_found' })
          return
        }

        console.log('students: ', res)
        result(false, res)
      })
  }
}

module.exports = Student
