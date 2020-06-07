const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(compression())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workoutTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// routes

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})


