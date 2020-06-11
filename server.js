const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// app.use(compression())
app.use(logger('dev'))
// app.use(cors())

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// Use api workouts route with api.js route handler
app.use('/api/workouts', require('./routes/api.js'))

// Display the exercise.html page
app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'))
})

// Display stats html page
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`)
})
