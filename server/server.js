require('dotenv').config()
const Database = require('./src/config/database')

const App = require('./src/app')
const app = new App(Database).app

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))
