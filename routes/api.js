// Import dependencies
const router = require('express').Router()
const { Workout } = require('../models')

// UPDATE a workout
// Use a workout's id to find it
// Push the user input in the request body into the database
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
  }
})

// POST a new workout
// Create a Workout db instance and save it
router.post('/', (req, res) => {
  try {
    const newWorkout = new Workout(req.body)
    newWorkout.save().then(dbWorkout => res.status(201).json(dbWorkout))
  } catch (err) {
    res.status(400).json(err)
  }
})

// Render page with all currently posted workouts
// Sort the workouts by date in descending order
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ date: -1 })

    workouts.forEach(workout => {
      let time = 0
      workout.exercises.forEach(exercise => {
        totalTime += exercise.duration
      })
      workout.totalDuration = time
    })
    res.json(workouts)
  } catch (err) {
    res.status(400).json(err)
  }
})

// Handles workout range route
router.get('/range', (req, res) => {
  res.status(307).redirect('/api/workouts')
})

module.exports = router
