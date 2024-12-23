import Author from '../models/Author.model.js';

export const createAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate } = req.body;
    const author = new Author({ name, bio, birthDate });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAuthors = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const filter = search
    ? { $or: [{ name: new RegExp(search, 'i') }, { bio: new RegExp(search, 'i') }] }
    : {};

  try {
    const authors = await Author.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('books', 'title content'); 
    
    const count = await Author.countDocuments(filter);
    res.json({ authors, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    res.json(author);
  } catch (err) {
    res.status(404).json({ error: 'Author not found' });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'Author not found' });
  }
};
