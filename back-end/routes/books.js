const router = require("express").Router();
const auth = require("../middleware/auth");
const request = require('request');
const User = require("../mongoModels/userModel");
const Books = require("../mongoModels/bookModel");

require("dotenv").config();

router.post("/search", async (req, res) => {

    try {
        const { title } = req.body;
        console.log(req.body);
        request("https://www.googleapis.com/books/v1/volumes?q=" + title +"&maxResults=12&key=" + process.env.BOOK_KEY, { json: true }, (err, response, body) => {
            if (err) console.log(err);
            res.json(body.items);
        });    
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }

});

router.post("/addToLibrary", auth, async (req, res) => {
    try {
        const {userID, bookID } = req.body;
        if (!userID || !bookID) res.status(400).json({ errMsg: "No ID provided, Cannot add book." });

        //Search the book in google API:
        request("https://www.googleapis.com/books/v1/volumes/" + bookID + "?key=" + process.env.BOOK_KEY, { json: true }, async (err, response, body) => {

            console.log(body);

            //Catch empty values:
            if (body.volumeInfo.categories) {
                genre=body.volumeInfo.categories[0];
            }else {
                genre = "undefined";
            }
            
            if (body.volumeInfo.imageLinks.thumbnail) {
                thumbnail = body.volumeInfo.imageLinks.thumbnail;
            } else {
                thumbnail = "../../assets/images/EmptyCover.png";
            }
            
            const book = new Book({
                _id: bookID,
                title: body.volumeInfo.title,
                author: body.volumeInfo.authors[0],
                genre,
                blurb: body.volumeInfo.description,
                thumbnail,
                read: false,
            });

            //Add book to database
            try {

                const saved = await book.save();

                try {
                    const update = await User.findByIdAndUpdate({ _id: userID }, { $push: { books: bookID } });
                    res.json({ msg: "Successfully added book to library." });
                } catch (err) {
                    console.log(err);
                    res.status(500).json({ msg: err.message });
                }

            } catch (err) {
                console.log(err);
                res.status(500).json({ msg: err.message });
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }


    
});


//Get user book list:
router.get("/userBooks", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const list = user.books;

        if (list.length == 0) return res.json({ books: [] });

        var data = [];
        var genres = [];
        for (var id of list) {
            var book = await Books.findById(id);
            genres.push(book.genre);
            data.push(book);
        }

        console.log(data);

        res.json({
            books: data,
            genres
        })
        

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;

