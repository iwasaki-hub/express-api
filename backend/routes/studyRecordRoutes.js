const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createStudyRecord,
  getStudyRecords,
} = require("../controllers/studyRecordController");

// 学習記録の保存
router.post("/", authMiddleware, createStudyRecord);

// ログインユーザーの学習履歴を取得
router.get("/", authMiddleware, getStudyRecords);

module.exports = router;
