import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 認証状態の確認中
  if (loading) {
    return <div className="auth-loading">読み込み中...</div>;
  }

  // 未ログインならログインページへ
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ログイン済みなら子ルートを表示
  return <Outlet />;
}

export default ProtectedRoute;
