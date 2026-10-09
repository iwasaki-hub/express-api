function StudyReview({ reviewQuestions }) {
  if (reviewQuestions.length === 0) {
    return (
      <section className="study-review-section">
        <h2>復習しておきたい問題</h2>

        <div className="study-review-empty">
          <span>🌟</span>
          <p>すばらしい！復習する問題はありません。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="study-review-section">
      <h2>復習しておきたい問題</h2>

      <p className="study-review-description">
        間違えた問題やスキップした問題を、もう一度確認しよう！
      </p>

      {reviewQuestions.map((item, index) => (
        <article
          className="study-review-card"
          key={`${item.question}-${index}`}
        >
          <div
            className={`study-review-badge ${
              item.status === "skipped" ? "is-skipped" : "is-incorrect"
            }`}
          >
            {item.status === "skipped" ? "スキップ" : "不正解"}
          </div>

          <h3>{item.question}</h3>

          <div className="study-review-answer">
            <p>
              <strong>借方：</strong>
              {item.debit}
              <span>{item.amount.toLocaleString("ja-JP")}円</span>
            </p>

            <p>
              <strong>貸方：</strong>
              {item.credit}
              <span>{item.amount.toLocaleString("ja-JP")}円</span>
            </p>
          </div>

          <p className="study-review-explanation">{item.explanation}</p>
        </article>
      ))}
    </section>
  );
}

export default StudyReview;
