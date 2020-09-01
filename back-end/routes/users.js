const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Middleware (authentification)

//User Model for mongoDB
const User = require("../mongoModels/userModel");

router.get("/test", (req, res) => {
  res.send("Test Successful");
});

module.exports = router;
