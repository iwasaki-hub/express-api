const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// ユーザー登録
router.post("/register", register);
// ログイン
router.post("/login", login);

module.exports = router;
