import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import { getUsers } from "../api/userApi";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="users-page">
        <div className="users-loading">
          <div className="loading-spinner"></div>
          <p>ユーザーを読み込んでいます...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-page">
        <div className="users-error">
          <div className="error-icon">!</div>
          <h2>読み込みに失敗しました</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-container">
        <header className="users-header">
          <div>
            <p className="users-eyebrow">ACCOUNT</p>
            <h1>ユーザー一覧</h1>
            <p className="users-description">
              登録されているユーザーを確認できます。
            </p>
          </div>

          <div className="users-count">
            <span>{users.length}</span>
            <small>USERS</small>
          </div>
        </header>

        {users.length === 0 ? (
          <div className="users-empty">
            <div className="empty-icon">👤</div>
            <h2>まだユーザーがいません</h2>
            <p>ユーザー登録すると、ここに表示されます。</p>
          </div>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <Link
                to={`/users/${user._id}`}
                className="user-card"
                key={user._id}
              >
                <div className="user-card-top">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-status">
                    <span className="status-dot"></span>
                    Active
                  </div>
                </div>

                <div className="user-info">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>

                <div className="user-card-footer">
                  <span className="user-label">JOINED</span>

                  <span>
                    {new Date(user.createdAt).toLocaleDateString("ja-JP")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
