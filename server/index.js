const express = require('express')
const cors = require('cors')
const studentsRouter = require('./routes/api/students.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/students', studentsRouter)

// simple route
app.get('/', (req, res) => {
  res.json({
    error: false,
    message: 'Welcome to the application!'
  })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))
