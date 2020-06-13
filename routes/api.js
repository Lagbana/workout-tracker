// Import dependencies
const router = require('express').Router()
const { Workout } = require('../models')

/*
  UPDATE the most recent workout
  Use a workout's id to find it
  Push the user input in the request body into the database
*/
router.put('/:id', async (req, res) => {
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    )
    res.json(updatedWorkout)
  } catch (err) {
    res.status(400).json(err)
    throw err
  }
})

/*
  POST a new workout
  Create a Workout db instance and save it
*/
router.post('/', async (req, res) => {
  try {
    const newWorkout = await Workout.create(req.body)
    res.status(201).json(newWorkout)
  } catch (err) {
    res.status(400).json(err)
    throw err
  }
})

/*
  Render page with all currently posted workouts
  Sort the workouts by date in descending order
*/
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({})
    workouts.forEach(workout => {
      let time = 0
      workout.exercises.forEach(exercise => {
        time += exercise.duration
      })
      workout.totalDuration = time
    })
    res.json(workouts)
  } catch (err) {
    res.status(400).json(err)
    throw err
  }
})

// Handles workout range route
// Displays workout statistics and performance charts
router.get('/range', (req, res) => {
  res.status(307).redirect('/api/workouts')
})

module.exports = router
