const { Schema, default: mongoose } = require("mongoose");

const excerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true},
}, {
    timeseries: true,
});

const Excercise = mongoose.model('Excercise', excerciseSchema);

module.exports = Excercise;