const express = require("express");
const { register, login, getMe, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ユーザー登録
router.post("/register", register);
// ログイン
router.post("/login", login);
// getMe
router.get("/me", authMiddleware, getMe);
// ログアウト
router.post("/logout", authMiddleware, logout);

module.exports = router;
