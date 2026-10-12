import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewQuestions } from "../api/reviewApi";
import "./Review.css";

const accounts = [
  "現金",
  "普通預金",
  "売掛金",
  "買掛金",
  "仕入",
  "売上",
  "消耗品費",
  "給料",
  "借入金",
  "備品",
  "資本金",
];

const formatAmount = (value) => {
  const digits = String(value).replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("ja-JP") : "";
};

function Review() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [debit, setDebit] = useState("");
  const [credit, setCredit] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadQuestions = async () => {
      try {
        const data = await getReviewQuestions();

        if (active) {
          setQuestions(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "復習問題を取得できませんでした。");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      active = false;
    };
  }, []);

  const currentQuestion = questions[index];
  const isFinished = !isLoading && !error && index >= questions.length;

  const resetAnswer = () => {
    setDebit("");
    setCredit("");
    setAmount("");
    setResult(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentQuestion || result) return;

    if (!debit || !credit || amount.trim() === "") {
      setError("借方・貸方・金額をすべて入力してください。");
      return;
    }

    setError("");

    const enteredAmount = Number(amount.replace(/,/g, ""));
    const isCorrect =
      debit === currentQuestion.debit &&
      credit === currentQuestion.credit &&
      Number.isFinite(enteredAmount) &&
      enteredAmount === currentQuestion.amount;

    setResult(isCorrect ? "correct" : "incorrect");
    setAnsweredCount((count) => count + 1);

    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }
  };

  const handleNext = () => {
    setIndex((value) => value + 1);
    resetAnswer();
    setError("");
  };

  if (isLoading) {
    return (
      <main className="review-page">
        <div className="review-container">
          <p>復習問題を読み込んでいます...</p>
        </div>
      </main>
    );
  }

  if (error && !currentQuestion) {
    return (
      <main className="review-page">
        <div className="review-container">
          <h1>復習問題を取得できませんでした</h1>
          <p role="alert">{error}</p>
          <Link to="/mypage" className="review-button">
            マイページへ戻る
          </Link>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="review-page">
        <div className="review-container">
          <p className="review-eyebrow">REVIEW TIME</p>
          <h1>復習タイム！</h1>
          <p>復習できる問題はまだありません。</p>
          <p>まずは通常の学習で仕訳に挑戦してみましょう。</p>
          <Link to="/study" className="review-button">
            学習を始める
          </Link>
          <Link to="/mypage" className="review-secondary-link">
            マイページへ戻る
          </Link>
        </div>
      </main>
    );
  }

  if (isFinished) {
    const accuracy =
      answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    return (
      <main className="review-page">
        <div className="review-container">
          <p className="review-eyebrow">REVIEW COMPLETE</p>
          <h1>復習おつかれさま！</h1>

          <section className="review-result-card">
            <p>今回の復習結果</p>
            <strong>
              {correctCount} / {answeredCount}
            </strong>
            <p>正答率 {accuracy}%</p>
          </section>

          <p>間違えた問題も、少しずつ自分の力にしていきましょう。</p>

          <Link to="/mypage" className="review-button">
            マイページへ戻る
          </Link>
          <Link to="/study" className="review-secondary-link">
            通常の学習をする
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="review-page">
      <div className="review-container">
        <p className="review-eyebrow">REVIEW TIME</p>
        <h1>仕訳の復習</h1>
        <p className="review-description">
          以前間違えた問題や、スキップした問題にもう一度挑戦しましょう。
        </p>

        <div className="review-progress">
          <span>
            問題 {index + 1} / {questions.length}
          </span>
          <span>
            {currentQuestion.status === "skipped"
              ? "前回：スキップ"
              : "前回：不正解"}
          </span>
        </div>

        <section className="review-question-card">
          <p className="review-category">
            {currentQuestion.category || "仕訳問題"}
          </p>
          <h2>{currentQuestion.question}</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="review-debit">借方</label>
            <select
              id="review-debit"
              value={debit}
              onChange={(event) => setDebit(event.target.value)}
              disabled={Boolean(result)}
              required
            >
              <option value="">勘定科目を選択</option>
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>

            <label htmlFor="review-credit">貸方</label>
            <select
              id="review-credit"
              value={credit}
              onChange={(event) => setCredit(event.target.value)}
              disabled={Boolean(result)}
              required
            >
              <option value="">勘定科目を選択</option>
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>

            <label htmlFor="review-amount">金額（円）</label>
            <input
              id="review-amount"
              inputMode="numeric"
              value={amount}
              onChange={(event) => setAmount(formatAmount(event.target.value))}
              disabled={Boolean(result)}
              placeholder="例：10,000"
              required
            />

            {error && <p className="review-error">{error}</p>}

            {!result ? (
              <button type="submit" className="review-button">
                回答を確認する
              </button>
            ) : (
              <section
                className={`review-feedback ${
                  result === "correct" ? "is-correct" : "is-incorrect"
                }`}
                aria-live="polite"
              >
                <h3>
                  {result === "correct" ? "正解！ 🎉" : "もう一度確認しよう"}
                </h3>
                <p>
                  正しい仕訳： 借方 {currentQuestion.debit} ／ 貸方{" "}
                  {currentQuestion.credit}
                </p>
                <p>金額：{formatAmount(currentQuestion.amount)}円</p>
                <p>{currentQuestion.explanation}</p>
                <button
                  type="button"
                  className="review-button"
                  onClick={handleNext}
                >
                  {index + 1 === questions.length ? "結果を見る" : "次の問題へ"}
                </button>
              </section>
            )}
          </form>
        </section>

        <Link to="/mypage" className="review-secondary-link">
          復習を中断してマイページへ戻る
        </Link>
      </div>
    </main>
  );
}

export default Review;
