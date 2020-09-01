const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Middleware (authentification)

//User Model for mongoDB
const User = require("../mongoModels/userModel");

router.get("/test", (req, res) => {
  res.send("Test Successful");
});

//Asnyc as it contacts the database:
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password)
      res.status(400).json({ ErrorMsg: "Not all fields have been entered." });

    //Check if the email has been used before
    const existing = await User.findOne({ email: email });
    if (existing)
      res
        .status(400)
        .json({ ErrorMsg: "A user with this email already exists." });

    if (password.length < 5)
      res.status(400).json({
        ErrorMsg: "Password too short. Should contain at least 5 characters.",
      });

    if (password != confirmPassword)
      res.status(400).json({ ErrorMsg: "Passwords don't match." });

    //Hashing password (MUST not be in plaintext.)
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    //Construct a user model object:
    const user = new User({
      name,
      email,
      password: hash,
    });

    //Saves to mongoDB database:
    const saved = await user.save();

    //returns the saved user:
    res.json(saved);
  } catch (err) {
    //Useful for debugging.
    console.log("There has been an error: " + err);
    res.status(500).json({ error: err.nessage });
  }
});

module.exports = router;
