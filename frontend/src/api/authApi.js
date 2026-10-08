const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getMe = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("ログインしていません");
  }

  const data = await response.json();

  return data.user;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("ログアウトに失敗しました");
  }

  return response.json();
};
