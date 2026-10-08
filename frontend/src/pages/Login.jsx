import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ログインに失敗しました");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-decoration login-decoration-yellow">
          <span>✦</span>
        </div>

        <div className="login-decoration login-decoration-coral">
          <span>•</span>
        </div>

        <header className="login-header">
          <div className="login-badge">
            <span>✦</span>
            BOOKKEEPING STUDY
          </div>

          <h1>
            おかえり。
            <br />
            今日も簿記を。
          </h1>

          <p>
            ログインして、
            <br />
            学習を続けましょう。
          </p>
        </header>

        <div className="login-card">
          <div className="login-card-header">
            <span className="login-card-number">01</span>

            <div>
              <p className="login-card-label">WELCOME BACK</p>
              <h2>ログイン</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
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

            <div className="login-field">
              <label htmlFor="password">パスワード</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="パスワードを入力"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="login-error">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "ログインしています..." : "ログインする"}

              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="login-register">
            <p>まだアカウントをお持ちでないですか？</p>

            <Link to="/register">
              アカウントを作成する
              <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="login-message">
          <span>✦</span>

          <p>
            今日の1問から、
            <br />
            また始めよう。
          </p>

          <span>✦</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
