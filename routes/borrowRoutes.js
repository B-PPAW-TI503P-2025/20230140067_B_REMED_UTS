const express = require("express");
const Book = require("../models/Book");
const BorrowLog = require("../models/BorrowLog");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * ADMIN: ambil semua riwayat peminjaman (logs)
 * URL final: GET /api/borrow/logs
 * Headers: x-user-role: admin
 */
router.get("/logs", auth, role("admin"), async (req, res) => {
  try {
    const logs = await BorrowLog.findAll({
      order: [["id", "DESC"]],
    });
    return res.json(logs);
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
});

/**
 * USER: pinjam buku + simpan lokasi
 * URL final: POST /api/borrow
 * Headers:
 *  - x-user-role: user
 *  - x-user-id: <angka>
 * Body: { bookId, latitude, longitude }
 */
router.post("/", auth, role("user"), async (req, res) => {
  try {
    const { bookId, latitude, longitude } = req.body;

    if (!bookId) return res.status(400).json({ message: "bookId wajib" });

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.stock < 1) return res.status(400).json({ message: "Stok habis" });

    // kurangi stok
    book.stock -= 1;
    await book.save();

    // catat log
    const log = await BorrowLog.create({
      userId: req.user.id,
      bookId: book.id,
      latitude: latitude !== undefined && latitude !== null ? Number(latitude) : null,
      longitude: longitude !== undefined && longitude !== null ? Number(longitude) : null,
    });

    return res.json({ message: "borrow success", log });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
});

module.exports = router;
