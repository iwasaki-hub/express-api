const mongoose = require("mongoose");
const StudyRecord = require("../models/StudyRecord");

/* ========================================
   学習記録の保存
======================================== */

const createStudyRecord = async (req, res) => {
  try {
    const {
      totalQuestions,
      correctCount,
      incorrectCount,
      skippedCount,
      reviewQuestions = [],
    } = req.body;

    const counts = [totalQuestions, correctCount, incorrectCount, skippedCount];

    // 問題数・各件数の入力を検証
    if (
      counts.some(
        (value) =>
          typeof value !== "number" ||
          !Number.isSafeInteger(value) ||
          value < 0,
      )
    ) {
      return res.status(400).json({
        message: "問題数と各件数は0以上の整数で指定してください",
      });
    }

    if (
      totalQuestions < 1 ||
      correctCount + incorrectCount + skippedCount !== totalQuestions
    ) {
      return res.status(400).json({
        message: "問題数と正解・不正解・スキップ数が一致しません",
      });
    }

    if (!Array.isArray(reviewQuestions)) {
      return res.status(400).json({
        message: "復習問題の形式が正しくありません",
      });
    }

    // 正答率はサーバー側で計算
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    const studyRecord = await StudyRecord.create({
      user: req.user.userId,
      totalQuestions,
      correctCount,
      incorrectCount,
      skippedCount,
      accuracy,
      reviewQuestions,
    });

    return res.status(201).json({
      message: "学習記録を保存しました",
      studyRecord,
    });
  } catch (error) {
    console.error("Create study record error:", error);

    return res.status(500).json({
      message: "学習記録の保存に失敗しました",
    });
  }
};

/* ========================================
   学習記録の取得
======================================== */

const getStudyRecords = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        message: "認証情報が正しくありません",
      });
    }

    const studyRecords = await StudyRecord.find({
      user: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      studyRecords,
    });
  } catch (error) {
    console.error("Get study records error:", error);

    return res.status(500).json({
      message: "学習履歴の取得に失敗しました",
    });
  }
};

module.exports = {
  createStudyRecord,
  getStudyRecords,
};
