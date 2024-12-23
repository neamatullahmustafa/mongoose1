import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controllers/Author.controller.js";
const authorRoutes = express.Router();

authorRoutes.route("/").post(createAuthor).get(getAuthors);
authorRoutes.route("/:id").get(getAuthorById).patch(updateAuthor).delete(deleteAuthor);

export default authorRoutes;
