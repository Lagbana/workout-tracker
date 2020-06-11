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
    newWorkout
      .save()
      .then(dbWorkout => res.status(201).json(dbWorkout))
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
