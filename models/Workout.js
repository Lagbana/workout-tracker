const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date()
  },

  exercises: [
    {
      name: {
        type: String,
        trim: true,
        required: 'Enter the workout name'
      },
      type: {
        type: String,
        required: 'Enter the type of training',
        trim: true
      },
      weight: {
        type: Number,
        trim: true
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      },
      duration: {
        type: Number,
        required: 'Please enter the duration of this workout'
      },
      distance: {
        type: Number
      }
    }
  ],
  totalDuration: Number
})

module.exports = mongoose.model('Workout', workoutSchema)
