/*
    User routes created with help from  
    https://www.youtube.com/watch?v=4_ZiJGY5F38 (devistry - MERN Stack user authentification)
*/

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

//Middleware (authentification)

//User Model for mongoDB
const User = require("../mongoModels/userModel");

router.get("/test", (req, res) => {
  res.send("Test Successful");
});

//REGISTRATION ROUTE
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
    res.status(500).json({ error: err.message });
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
      console.log(email);
    if (!email || !password)
      res.status(400).json({ ErrorMsg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ ErrorMsg: "No user with that email exists." });
    }

    //Matching the passwords
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      res.status(400).json({ ErrorMsg: "Incorrect Log-In Credentials" });
    }

    //Json web token - used for authorization on the front end.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    //Useful for debugging.
    console.log("There has been an error: " + err);
    res.status(500).json({ error: err.message });
  }
});

//Get user data: (Must be logged in (check with auth)):
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    id: user._id,
  });
});

//Get user book list:
router.get("/userBooks", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const list = user.books;
        res.json({
            books: list,
        });
    } catch (err) {
        json.res(500).json({ error: err.message });
    }
    
});

module.exports = router;
