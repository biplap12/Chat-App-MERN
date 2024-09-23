const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

app.use(express.json());

//routes
app.get("/api/dashboard", (req, res) => {
    res.send("Hello World");
  });
  
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
