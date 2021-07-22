import { Router } from 'express'

const studentsRouter = Router()

// Get Students
studentsRouter.get('/', async (req, res) => {
  return res.status(200).send('Students List')
})

studentsRouter.get('/:id', async (req, res) => {
  return res.status(200).send('Student Data')
})

// Add Student
studentsRouter.post('/', async (req, res) => {
  return res.status(201).send('Student Inserted')
})

// Update Student
studentsRouter.put('/:id', async (req, res) => {
  return res.status(200).send('Student Updated')
})

// Delete Student
studentsRouter.delete('/:id', async (req, res) => {
  return res.status(200).send('Student Deleted')
})

export { studentsRouter }
