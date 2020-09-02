const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const request = require('request');

require("dotenv").config();

router.get("/search", async (req, res) => {

    try {
        const { title } = req.body;

        request("https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=" + process.env.BOOK_KEY, { json: true }, (err, response, body) => {
            if (err) console.log(err);
            res.json(body);
        });
    
        
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
    



});


module.exports = router;

