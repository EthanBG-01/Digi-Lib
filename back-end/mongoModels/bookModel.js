const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    blurb: { type: String },
    thumbnail: { type: String, required: true },
    read: { type: Boolean },
    notes: [{type: String }],
});

module.exports = Book = mongoose.model("Book", bookSchema);
