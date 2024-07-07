const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Date,
        default: Date.now
    }
});

const BookModel = mongoose.model('Book', bookSchema);
module.exports = BookModel;