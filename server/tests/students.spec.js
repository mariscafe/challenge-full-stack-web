const request = require('supertest')

require('dotenv').config()
const Database = require('../src/config/database')

const App = require('../src/app')
const app = new App(Database).app

describe('Students API', () => {
  describe('list students', () => {
    it('should show all students', async () => {
      await request(app)
        .get('/api/students/list')
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('data')
        })
    })
  })

  describe('insert student', () => {
    describe('when passed all valid required fields', () => {
      it('should create a student', async () => {
        await request(app)
          .post('/api/students/insert')
          .send({
            cpf: '99999999999',
            name: 'John Doe',
            email: 'john@email.com',
            register: '999999'
          })
          .then(response => {
            expect(response.statusCode).toBe(201)
          })
      })
    })

    describe('when required fields are missing', () => {
      it('should fail creation', async () => {
        await request(app)
          .post('/api/students/insert')
          .send({
            cpf: '99999999999',
            name: 'John Doe',
            register: '123456'
          })
          .then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toHaveProperty(
              'message',
              'Body missing fields'
            )
          })
      })
    })
  })

  describe('delete student', () => {
    describe('when passed an existing CPF', () => {
      it('should delete the student', async () => {
        const cpf = '99999999999'

        await request(app)
          .delete(`/api/students/delete/${cpf}`)
          .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty(
              'message',
              'Student deleted.'
            )
          })
      })
    })

    describe('when passed an non existing CPF', () => {
      it('should show info message', async () => {
        const cpf = '99999999998'

        await request(app)
          .delete(`/api/students/delete/${cpf}`)
          .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty(
              'message',
              'Student not found.'
            )
          })
      })
    })
  })
})
