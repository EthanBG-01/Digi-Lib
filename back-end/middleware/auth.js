/*
    auth created with help from  
    https://www.youtube.com/watch?v=4_ZiJGY5F38 (devistry - MERN Stack user authentification)
*/

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    //Check if the web token is valid (and not tampered with, and matches the user.)
      const token = req.header("x-auth-token");
      
      if (!token) {
          console.log("no token");
          return res.status(401).json({ ErrorMsg: "No authentification token" });
      }
      

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!verifiedToken) {
          console.log("Unverified");
          return res.status(401).json({ ErrorMsg: "Token authorization failed." });
      }
      
    //Req is passed on to the next()
    req.user = verifiedToken.id;
    next();
  } catch (err) {
    //Useful for debugging.
    console.log("There has been an error: " + err);
    res.status(500).json({ error: err.nessage });
  }
};

module.exports = auth;
