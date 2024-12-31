import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }, 
    publishedDate: { type: Date, default: Date.now },
},{versionKey: false});

const Book = mongoose.model('Book', bookSchema);

export default Book;
