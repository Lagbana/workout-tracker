// Import dependencies
const router = require('express').Router()
const { Workout } = require('../models')

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
// Create a new instance of workout
// Save it, then send the new workout back to the client
router.post('/', (req, res, next) => {
  const newWorkout = new Workout(req.body)
  newWorkout
    .save()
    .then(dbWorkout => res.status(201).json(dbWorkout))
    .catch(next)
})

// Render page with all currently posted workouts
// Sort the workouts by date in descending order
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({})
    // console.log(workouts)
    workouts.forEach(workout => {
      let totalTime = 0
      workout.exercises.forEach(exercise => {
        totalTime += exercise.duration
      })
      workout.totalDuration = totalTime
    })

    res.json(workouts)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/range', (req, res) => {
  res.status(307).redirect('/api/workouts')
})

module.exports = router
