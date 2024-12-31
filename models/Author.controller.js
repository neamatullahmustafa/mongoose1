const Author = require('./Author.models');

exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAuthors = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const filter = search
    ? { $or: [{ name: new RegExp(search, 'i') }, { bio: new RegExp(search, 'i') }] }
    : {};
  try {
    const authors = await Author.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Author.countDocuments(filter);
    res.json({ authors, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    res.json(author);
  } catch (err) {
    res.status(404).json({ error: 'Author not found' });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'Author not found' });
  }
};
