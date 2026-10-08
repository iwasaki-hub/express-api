import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("すべての項目を入力してください");
      return;
    }

    if (formData.password.length < 4) {
      setError("パスワードは4文字以上で入力してください");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ユーザー登録に失敗しました");
      }

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Decorative elements */}
        <div className="register-decoration register-decoration-yellow">
          <span>✦</span>
        </div>

        <div className="register-decoration register-decoration-purple">
          <span>•</span>
        </div>

        {/* Header */}
        <header className="register-header">
          <div className="register-badge">
            <span>✦</span>
            BOOKKEEPING STUDY
          </div>

          <h1>
            簿記を
            <br />
            はじめよう。
          </h1>

          <p>
            アカウントを作って、
            <br />
            今日から簿記を学びましょう。
          </p>
        </header>

        {/* Register Card */}
        <div className="register-card">
          <div className="register-card-header">
            <span className="register-card-number">01</span>

            <div>
              <p className="register-card-label">SIGN UP</p>
              <h2>アカウント作成</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Name */}
            <div className="register-field">
              <label htmlFor="name">名前</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="例：田中 太郎"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="register-field">
              <label htmlFor="email">メールアドレス</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="register-field">
              <label htmlFor="password">パスワード</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="4文字以上"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <span className="register-field-help">
                4文字以上で設定してください
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="register-error">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? "登録しています..." : "アカウントを作成する"}

              {!loading && <span>→</span>}
            </button>
          </form>

          {/* Login */}
          <div className="register-login">
            <p>すでにアカウントをお持ちですか？</p>

            <Link to="/login">
              ログインする
              <span>↗</span>
            </Link>
          </div>
        </div>

        {/* Bottom message */}
        <div className="register-message">
          <span>✦</span>

          <p>
            1問ずつ、
            <br />
            一緒に積み重ねよう。
          </p>

          <span>✦</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
