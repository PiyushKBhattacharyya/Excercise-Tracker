const router = require("express").Router();
const Exercise = require("../models/exercise.model");

// GET all exercises
router.route("/").get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises)) 
        .catch(err => res.status(400).json("Error: " + err));
});

// POST - Add a new exercise
router.route("/add").post((req, res) => {
    if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({ error: "Invalid JSON format in request body" });
    }

    const { username, description, duration, date } = req.body;

    if (!username || !description || !duration || !date) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const newExercise = new Exercise({
        username,
        description,
        duration: Number(duration),
        date: new Date(date),
    });

    newExercise.save()
        .then(() => res.json("Exercise Added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndRemove(req.params.id)
        .then(() => res.json("Exercise deleted!"))
        .catch(err => res.status(400).json("error: "+ err))
});

module.exports = router;
