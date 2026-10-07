const API_BASE_URL = "http://localhost:5000/api";

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("ユーザー一覧の取得に失敗しました");
  }

  const data = await response.json();

  return data.users;
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error("ユーザー情報の取得に失敗しました");
  }

  const data = await response.json();

  return data.user;
};
