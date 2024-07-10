const express = require('express');
const Book = require('../models/bookSchema');

const router = express.Router();

// Create a new book.
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);        
    }
    catch(error) {        
        res.status(400).send(error);
    } 
})

// Get all books.
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).send(books);
    } catch(error) {
        res.status(500).send(error);
    }
})

// Get a specific book by ID.
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            return res.status(404).send('Book not found!');
        }
        res.status(200).send(book);
    } catch(error) {
        res.status(500).send(error);
    }
})

// Delete a book by ID.
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const bookExist = await Book.findById({_id: id});
        if(!bookExist) {
            res.status(404).send("Book not found!");
        }
        await Book.findByIdAndDelete(id);        
        res.status(200).send({message: "Book deleted successfully."});
    } catch(error) {
        res.status(500).send(error);
    }
})

// Update a book by ID.
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const bookExist = await Book.findById({_id: id});
        if(!bookExist) {
            res.status(404).send("Book not found!");
        }
        const updateBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).send(updateBook);
    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;

