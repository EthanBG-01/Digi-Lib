const router = require("express").Router();
const auth = require("../middleware/auth");
const request = require('request');
const User = require("../mongoModels/userModel");

require("dotenv").config();

router.post("/search", async (req, res) => {

    try {
        const { title } = req.body;
        console.log(req.body);
        request("https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=" + process.env.BOOK_KEY, { json: true }, (err, response, body) => {
            if (err) console.log(err);
            res.json(body.items);
        });    
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }

});

router.post("/addToLibrary", auth, async (req, res) => {
    //add the book ID to the array 'books':
    try {
        const {userID, bookID } = req.body;
        if (!userID || !bookID) res.status(400).json({ errMsg: "No ID provided, Cannot add book." });
        
        const update = await User.findByIdAndUpdate({ _id: userID }, { $push: { books: bookID } });
        res.json(update);
            
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }
});


module.exports = router;

