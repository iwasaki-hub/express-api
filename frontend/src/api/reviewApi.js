import { getStudyRecords } from "./studyRecordApi";

/**
 * 学習履歴から復習対象の問題を取得する
 * 不正解・スキップの問題を新しい学習記録から順にまとめる
 */
export const getReviewQuestions = async () => {
  const records = await getStudyRecords();

  return records.flatMap((record) =>
    (Array.isArray(record.reviewQuestions) ? record.reviewQuestions : [])
      .filter(
        (question) =>
          question &&
          ["incorrect", "skipped"].includes(question.status) &&
          question.question &&
          question.debit &&
          question.credit &&
          Number.isFinite(question.amount),
      )
      .map((question, index) => ({
        ...question,
        reviewKey: `${record._id}-${question.questionId || index}`,
        sourceRecordId: record._id,
        sourceCreatedAt: record.createdAt,
      })),
  );
};
