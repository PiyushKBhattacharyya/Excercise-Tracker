const router = require("express").Router();
const User = require("../models/user.model");

// GET all users
router.route("/").get(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST - Add a new user
router.route("/add").post(async (req, res) => {
    try {
        if (!req.body || typeof req.body !== "object") {
            return res.status(400).json({ error: "Invalid JSON format in request body" });
        }

        const { username } = req.body;

        if (!username || username.length < 3) {
            return res.status(400).json({ error: "Username must be at least 3 characters long." });
        }

        const newUser = new User({ username });
        await newUser.save();
        res.json({ message: "User Added!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
