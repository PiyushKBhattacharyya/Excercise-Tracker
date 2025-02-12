const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parses JSON requests

// Middleware to handle invalid JSON errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
});

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Database connection established successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const excerciseRouter = require("./routes/excercises");
const UsersRouter = require("./routes/users");

app.use("/excercises", excerciseRouter);
app.use("/users", UsersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
