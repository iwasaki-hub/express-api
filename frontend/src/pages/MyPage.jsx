import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("studyHistory") || "[]");

      setHistory(Array.isArray(saved) ? saved : []);
    } catch {
      setHistory([]);
    }
  }, []);

  const totalQuestions = history.reduce(
    (sum, session) => sum + (session.totalQuestions || 0),
    0,
  );

  const totalCorrect = history.reduce(
    (sum, session) => sum + (session.correctCount || 0),
    0,
  );

  const totalIncorrect = history.reduce(
    (sum, session) => sum + (session.incorrectCount || 0),
    0,
  );

  const totalSkipped = history.reduce(
    (sum, session) => sum + (session.skippedCount || 0),
    0,
  );

  const accuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "日付不明";
    }

    return parsedDate.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="mypage">
      <div className="mypage-container">
        <header className="mypage-header">
          <p className="mypage-eyebrow">YOUR LEARNING JOURNEY</p>
          <h1>マイページ</h1>
          <p>小さな積み重ねが、簿記の力になっていく。</p>
        </header>

        <section className="mypage-summary">
          <article className="mypage-summary-card is-yellow">
            <span>累計学習問題数</span>
            <strong>{totalQuestions}</strong>
            <small>問</small>
          </article>

          <article className="mypage-summary-card is-mint">
            <span>累計正答率</span>
            <strong>{accuracy}</strong>
            <small>%</small>
          </article>

          <article className="mypage-summary-card is-purple">
            <span>学習回数</span>
            <strong>{history.length}</strong>
            <small>回</small>
          </article>
        </section>

        <section className="mypage-breakdown">
          <h2>学習の内訳</h2>

          <div className="mypage-breakdown-row">
            <span>正解</span>
            <strong>{totalCorrect}問</strong>
          </div>

          <div className="mypage-breakdown-row">
            <span>不正解</span>
            <strong>{totalIncorrect}問</strong>
          </div>

          <div className="mypage-breakdown-row">
            <span>スキップ</span>
            <strong>{totalSkipped}問</strong>
          </div>
        </section>

        <section className="mypage-history">
          <h2>学習履歴</h2>

          {history.length === 0 ? (
            <div className="mypage-empty">
              <span>📚</span>
              <h3>これから一緒に積み重ねよう！</h3>
              <p>
                まだ学習履歴がありません。
                最初の仕訳トレーニングに挑戦してみましょう。
              </p>
              <Link to="/study" className="mypage-primary-button">
                学習を始める
              </Link>
            </div>
          ) : (
            history.map((session) => (
              <article className="mypage-history-card" key={session.id}>
                <div className="mypage-history-top">
                  <div>
                    <span className="mypage-history-label">
                      仕訳トレーニング
                    </span>
                    <p>{formatDate(session.date)}</p>
                  </div>

                  <strong className="mypage-history-score">
                    {session.accuracy}%
                  </strong>
                </div>

                <div className="mypage-history-stats">
                  <span>全{session.totalQuestions}問</span>
                  <span>正解 {session.correctCount}</span>
                  <span>不正解 {session.incorrectCount}</span>
                  <span>スキップ {session.skippedCount}</span>
                </div>
              </article>
            ))
          )}
        </section>

        <Link to="/" className="mypage-home-link">
          ← ホームへ戻る
        </Link>
      </div>
    </main>
  );
}

export default MyPage;
