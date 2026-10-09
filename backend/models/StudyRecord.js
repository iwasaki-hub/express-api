const mongoose = require("mongoose");

const studyRecordSchema = new mongoose.Schema(
  {
    // 学習したユーザー
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 学習セッションの結果
    totalQuestions: {
      type: Number,
      required: true,
      min: 0,
    },

    correctCount: {
      type: Number,
      required: true,
      min: 0,
    },

    incorrectCount: {
      type: Number,
      required: true,
      min: 0,
    },

    skippedCount: {
      type: Number,
      required: true,
      min: 0,
    },

    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // 間違えた問題・スキップした問題
    reviewQuestions: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// ユーザーごとの学習履歴を新しい順に取得しやすくする
studyRecordSchema.index({ user: 1, createdAt: -1 });

const StudyRecord = mongoose.model("StudyRecord", studyRecordSchema);

module.exports = StudyRecord;
