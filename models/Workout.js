// Import mongoose to create database schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Workout schema with properties
/*
  *day property: current date
  *exercises: array of exercise properties
  *total duration: total time for exercises completed
*/

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
        trim: true,
        required: 'Enter the type of training'
      },
      weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      },
      duration: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ],
  totalDuration: Number
})

module.exports = mongoose.model('Workout', workoutSchema)
