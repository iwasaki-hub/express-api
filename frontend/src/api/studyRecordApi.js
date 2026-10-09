const API_URL = import.meta.env.VITE_API_URL;

// 学習記録 API のベース URL
const STUDY_RECORDS_URL = `${API_URL}/study-records`;

/**
 * API エラーを処理する共通関数
 */
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "学習記録の処理に失敗しました");
  }

  return data;
};

/**
 * 学習記録を MongoDB に保存する
 *
 * @param {Object} record 学習結果
 * @returns {Promise<Object>} 保存された学習記録
 */
export const createStudyRecord = async (record) => {
  const response = await fetch(STUDY_RECORDS_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  return handleResponse(response);
};

/**
 * ログインユーザーの学習履歴を取得する
 *
 * @returns {Promise<Array>} 学習記録の配列
 */
export const getStudyRecords = async () => {
  const response = await fetch(STUDY_RECORDS_URL, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await handleResponse(response);

  return data.studyRecords;
};
