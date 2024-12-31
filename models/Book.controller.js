const Book = require('./Book.models');

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const filter = search
    ? { $or: [{ title: new RegExp(search, 'i') }, { author: new RegExp(search, 'i') }] }
    : {};
  try {
    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Book.countDocuments(filter);
    res.json({ books, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(404).json({ error: 'Book not found' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'Book not found' });
  }
};
