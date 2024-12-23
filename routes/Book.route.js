import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/Book.controller.js";
const bookRoutes = express.Router();

bookRoutes.route("/").post(createBook).get(getBooks);
bookRoutes.route("/:id").get(getBookById).patch(updateBook).delete(deleteBook);

export default bookRoutes;
