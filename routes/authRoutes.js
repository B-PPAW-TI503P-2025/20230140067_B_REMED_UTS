const express = require("express");
const User = require("../models/User");
const router = express.Router();

// REGISTER: user only
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username & password wajib diisi" });
    }

    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(409).json({ message: "username sudah dipakai" });

    const user = await User.create({
      username,
      password, // (simple) tanpa hash
      role: "user", // paksa user
    });

    res.json({ message: "register berhasil", userId: user.id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

// LOGIN: admin/user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username & password wajib diisi" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "username / password salah" });

    if (user.password !== password) {
      return res.status(401).json({ message: "username / password salah" });
    }

    // Tanpa JWT: frontend simpan role & userId, lalu kirim via headers
    res.json({ message: "login berhasil", userId: user.id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

module.exports = router;
