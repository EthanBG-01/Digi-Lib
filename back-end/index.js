/*
    Backend created with help from  
    https://www.youtube.com/watch?v=4_ZiJGY5F38 (devistry - MERN Stack user authentification)
*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Environment variables; string for MongoDB Atlas DB
require("dotenv").config();

//Setup the express app:
const app = express();
app.use(express.json());
app.use(cors());

//Listen (Port - seperated as hosting provider may assign a different port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on :${PORT}`));

//MongoDB:
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log("Mongo DB connection established");
  }
);

//Routes in use:
app.use("/users", require("./routes/users"));
