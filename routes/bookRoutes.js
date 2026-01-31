const express = require("express");
const Book = require("../models/Book");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", async (req, res) => {
  const books = await Book.findAll({ order: [["id", "ASC"]] });
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// ADMIN
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const { title, author, stock } = req.body;
    if (!title || !author) return res.status(400).json({ message: "title & author wajib diisi" });

    const created = await Book.create({
      title,
      author,
      stock: Number.isInteger(stock) ? stock : Number(stock) || 0,
    });

    res.json({ message: "book created", data: created });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

router.put("/:id", auth, role("admin"), async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { title, author, stock } = req.body;
    if (title !== undefined && title === "") return res.status(400).json({ message: "title tidak boleh kosong" });
    if (author !== undefined && author === "") return res.status(400).json({ message: "author tidak boleh kosong" });

    await book.update({
      title: title ?? book.title,
      author: author ?? book.author,
      stock: stock !== undefined ? Number(stock) : book.stock,
    });

    res.json({ message: "book updated", data: book });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

router.delete("/:id", auth, role("admin"), async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.destroy();
    res.json({ message: "book deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

module.exports = router;
