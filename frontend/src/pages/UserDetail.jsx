import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserDetail.css";
import { getUserById } from "../api/userApi";

function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id);
        setUser(user);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="user-detail-page">
        <p>読み込んでいます...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-detail-page">
        <h2>ユーザー情報を取得できませんでした</h2>
        <p>{error}</p>

        <Link to="/users">← ユーザー一覧へ戻る</Link>
      </div>
    );
  }

  return (
    <div className="user-detail-page">
      <div className="user-detail-container">
        <Link to="/users" className="back-link">
          ← ユーザー一覧へ戻る
        </Link>

        <div className="user-detail-card">
          <div className="user-detail-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <p className="user-detail-label">USER PROFILE</p>

          <h1>{user.name}</h1>

          <p className="user-detail-email">{user.email}</p>

          <div className="user-detail-info">
            <div>
              <span>ユーザーID</span>
              <p>{user._id}</p>
            </div>

            <div>
              <span>登録日</span>
              <p>{new Date(user.createdAt).toLocaleDateString("ja-JP")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
