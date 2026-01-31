module.exports = (req, res, next) => {
  const role = req.headers["x-user-role"];
  const userId = req.headers["x-user-id"];

  if (!role) {
    return res.status(401).json({ message: "Missing header: x-user-role" });
  }

  req.user = { role };

  if (role === "user") {
    if (!userId) return res.status(401).json({ message: "Missing header: x-user-id" });
    const parsed = Number(userId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return res.status(401).json({ message: "Invalid x-user-id" });
    }
    req.user.id = parsed;
  }

  next();
};
