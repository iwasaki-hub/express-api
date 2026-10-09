import { Link } from "react-router-dom";
import StudyReview from "./StudyReview";
import "./StudyResult.css";

function StudyResult({
  correctCount,
  incorrectCount,
  skippedCount,
  totalQuestions,
  reviewQuestions,
  onRestart,
}) {
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  return (
    <section className="study-page">
      <div className="study-container study-result-screen">
        <div className="study-result-illustration">🎉</div>

        <p className="study-eyebrow">SESSION COMPLETE!</p>

        <h1>{totalQuestions}問おつかれさま！</h1>

        <p className="study-result-description">
          一歩ずつ、簿記が身についています。
        </p>

        <div className="study-score-card">
          <span>今回の正解数</span>

          <strong>
            {correctCount}
            <small> / {totalQuestions} 問</small>
          </strong>

          <div className="study-score-track">
            <div
              className="study-score-fill"
              style={{ width: `${accuracy}%` }}
            />
          </div>

          <p className="study-result-description">正答率：{accuracy}%</p>
        </div>

        <div className="study-result-stats">
          <div className="study-stat-card is-correct">
            <span>正解</span>
            <strong>{correctCount}</strong>
            <small>問</small>
          </div>

          <div className="study-stat-card is-incorrect">
            <span>不正解</span>
            <strong>{incorrectCount}</strong>
            <small>問</small>
          </div>

          <div className="study-stat-card is-skipped">
            <span>スキップ</span>
            <strong>{skippedCount}</strong>
            <small>問</small>
          </div>
        </div>

        <StudyReview reviewQuestions={reviewQuestions} />

        <button
          type="button"
          className="study-primary-button"
          onClick={onRestart}
        >
          もう一度チャレンジ！
        </button>

        <Link to="/" className="study-home-link">
          ホームへ戻る
        </Link>
      </div>
    </section>
  );
}

export default StudyResult;
