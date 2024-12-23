import mongoose from 'mongoose';
import Author from '../models/Author.model.js';
import Book from '../models/Book.model.js';

export const createBook = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const authorObjectId = new mongoose.Types.ObjectId(author);

    const newBook = new Book({
      title,
      content,
      author: authorObjectId, 
    });
    
    await newBook.save();
    
    const authorDoc = await Author.findById(author);
    authorDoc.books.push(newBook._id);
    await authorDoc.save();
    
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getBooks = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const filter = search
    ? { $or: [{ title: new RegExp(search, 'i') }, { author: new RegExp(search, 'i') }] }
    : {};
  try {
    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit).populate('author', 'name bio');
    const count = await Book.countDocuments(filter);
    res.json({ books, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(404).json({ error: 'Book not found' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'Book not found' });
  }
};
