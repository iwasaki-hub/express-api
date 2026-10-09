import { useState } from "react";
import { Link } from "react-router-dom";
import "./Study.css";

const questions = [
  {
    question: "商品10,000円を現金で仕入れた。",
    debit: "仕入",
    credit: "現金",
    amount: 10000,
    explanation:
      "商品を仕入れたときは「仕入」が増加するため借方、現金が減少するため貸方に記入します。",
  },
  {
    question: "商品20,000円を現金で販売した。",
    debit: "現金",
    credit: "売上",
    amount: 20000,
    explanation:
      "現金を受け取ったので借方は「現金」、商品を販売して収益が発生したので貸方は「売上」です。",
  },
  {
    question: "事務用品3,000円を現金で購入した。",
    debit: "消耗品費",
    credit: "現金",
    amount: 3000,
    explanation:
      "事務用品の購入は費用の発生なので借方に「消耗品費」、現金の減少は貸方に記入します。",
  },
  {
    question: "取引先に商品15,000円を掛けで販売した。",
    debit: "売掛金",
    credit: "売上",
    amount: 15000,
    explanation:
      "代金を後日受け取る権利である「売掛金」が増加するため借方、売上は貸方です。",
  },
  {
    question: "商品8,000円を掛けで仕入れた。",
    debit: "仕入",
    credit: "買掛金",
    amount: 8000,
    explanation:
      "仕入は費用なので借方、後日支払う義務である「買掛金」は貸方に記入します。",
  },
  {
    question: "売掛金12,000円を現金で回収した。",
    debit: "現金",
    credit: "売掛金",
    amount: 12000,
    explanation: "現金が増えるため借方、売掛金という債権が減るため貸方です。",
  },
  {
    question: "従業員の給料25,000円を現金で支払った。",
    debit: "給料",
    credit: "現金",
    amount: 25000,
    explanation:
      "給料は費用の発生なので借方、支払った現金は減少するため貸方です。",
  },
  {
    question: "銀行から現金50,000円を借り入れた。",
    debit: "現金",
    credit: "借入金",
    amount: 50000,
    explanation:
      "現金が増えるため借方、将来返済する義務である借入金が増えるため貸方です。",
  },
  {
    question: "備品30,000円を現金で購入した。",
    debit: "備品",
    credit: "現金",
    amount: 30000,
    explanation:
      "備品という資産が増えるため借方、現金という資産が減るため貸方です。",
  },
  {
    question: "株主から出資を受け、現金100,000円を受け取った。",
    debit: "現金",
    credit: "資本金",
    amount: 100000,
    explanation:
      "現金が増えるため借方、出資によって資本金が増えるため貸方です。",
  },
];

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
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers === "") {
    return "";
  }

  return Number(numbers).toLocaleString("ja-JP");
};

function Study() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [debit, setDebit] = useState("");
  const [credit, setCredit] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [result, setResult] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[questionIndex];
  const isFinished = questionIndex >= questions.length;

  const resetAnswer = () => {
    setDebit("");
    setCredit("");
    setDebitAmount("");
    setCreditAmount("");
    setResult(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (result && !result.validationError) {
      return;
    }

    if (!debit || !credit || !debitAmount || !creditAmount) {
      setResult({
        correct: false,
        skipped: false,
        validationError: "勘定科目と金額をすべて入力してください。",
      });
      return;
    }

    const isCorrect =
      debit === currentQuestion.debit &&
      credit === currentQuestion.credit &&
      Number(debitAmount.replace(/,/g, "")) === currentQuestion.amount &&
      Number(creditAmount.replace(/,/g, "")) === currentQuestion.amount;

    setResult({
      correct: isCorrect,
      skipped: false,
      validationError: "",
    });

    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }
  };

  const handleSkip = () => {
    if (result && !result.validationError) {
      return;
    }

    setResult({
      correct: false,
      skipped: true,
      validationError: "",
    });
  };

  const handleNext = () => {
    setQuestionIndex((index) => index + 1);
    resetAnswer();
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    resetAnswer();
  };

  if (isFinished) {
    return (
      <section className="study-page">
        <div className="study-container study-result-screen">
          <div className="study-result-illustration">🎉</div>

          <p className="study-eyebrow">SESSION COMPLETE!</p>

          <h1>10問おつかれさま！</h1>

          <p className="study-result-description">
            一歩ずつ、簿記が身についています。
          </p>

          <div className="study-score-card">
            <span>今回の正解数</span>

            <strong>
              {correctCount}
              <small> / {questions.length} 問</small>
            </strong>

            <div className="study-score-track">
              <div
                className="study-score-fill"
                style={{
                  width: `${(correctCount / questions.length) * 100}%`,
                }}
              />
            </div>

            <p className="study-result-description">
              正答率：{Math.round((correctCount / questions.length) * 100)}%
            </p>
          </div>

          <button
            type="button"
            className="study-primary-button"
            onClick={handleRestart}
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

  return (
    <section className="study-page">
      <div className="study-container">
        <div className="study-topline">
          <Link to="/" className="study-back-link">
            ← ホーム
          </Link>

          <span className="study-session-label">仕訳トレーニング</span>
        </div>

        <div className="study-progress-section">
          <div className="study-progress-text">
            <span>YOUR PROGRESS</span>

            <strong>
              {questionIndex + 1}
              <small> / {questions.length}</small>
            </strong>
          </div>

          <div
            className="study-progress-track"
            role="progressbar"
            aria-valuenow={questionIndex + 1}
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-label="問題の進捗"
          >
            <div
              className="study-progress-fill"
              style={{
                width: `${((questionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="study-question-card">
          <div className="study-question-badge">
            <span>Q{questionIndex + 1}</span>
            <span>仕訳問題</span>
          </div>

          <h1>この取引を仕訳してみよう！</h1>

          <div className="study-question-text">{currentQuestion.question}</div>

          <p className="study-hint">
            借方と貸方、それぞれの勘定科目と金額を入力してください。
            わからない場合は、解説を見ながら学習できます。
          </p>
        </div>

        <form className="study-answer-card" onSubmit={handleSubmit}>
          <div className="study-journal-heading">
            <h2>あなたの仕訳</h2>
            <span>JOURNAL ENTRY</span>
          </div>

          <div className="study-journal">
            {/* 借方 */}
            <div className="study-journal-column">
              <div className="study-column-title study-debit-title">借方</div>

              <label className="study-field-label" htmlFor="debit-account">
                勘定科目
              </label>

              <select
                id="debit-account"
                value={debit}
                onChange={(event) => setDebit(event.target.value)}
                disabled={!!result && !result.validationError}
                required
              >
                <option value="">選択してください</option>

                {accounts.map((account) => (
                  <option key={account} value={account}>
                    {account}
                  </option>
                ))}
              </select>

              <label className="study-field-label" htmlFor="debit-amount">
                金額（円）
              </label>

              <input
                id="debit-amount"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="例：10,000"
                value={debitAmount}
                onChange={(event) =>
                  setDebitAmount(formatAmount(event.target.value))
                }
                disabled={!!result && !result.validationError}
                required
              />
            </div>

            {/* 貸方 */}
            <div className="study-journal-column">
              <div className="study-column-title study-credit-title">貸方</div>

              <label className="study-field-label" htmlFor="credit-account">
                勘定科目
              </label>

              <select
                id="credit-account"
                value={credit}
                onChange={(event) => setCredit(event.target.value)}
                disabled={!!result && !result.validationError}
                required
              >
                <option value="">選択してください</option>

                {accounts.map((account) => (
                  <option key={account} value={account}>
                    {account}
                  </option>
                ))}
              </select>

              <label className="study-field-label" htmlFor="credit-amount">
                金額（円）
              </label>

              <input
                id="credit-amount"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="例：10,000"
                value={creditAmount}
                onChange={(event) =>
                  setCreditAmount(formatAmount(event.target.value))
                }
                disabled={!!result && !result.validationError}
                required
              />
            </div>
          </div>

          {/* 入力エラー */}
          {result?.validationError && (
            <p className="study-validation-error" role="alert">
              {result.validationError}
            </p>
          )}

          {/* 正解・不正解・スキップのフィードバック */}
          {result && !result.validationError && (
            <div
              className={`study-feedback ${
                result.skipped
                  ? "is-skipped"
                  : result.correct
                    ? "is-correct"
                    : "is-incorrect"
              }`}
              role="status"
              aria-live="polite"
            >
              <div className="study-feedback-title">
                {result.skipped
                  ? "💡 大丈夫！答えを確認しよう"
                  : result.correct
                    ? "🎉 正解！すばらしい！"
                    : "🌱 惜しい！答えを確認しよう"}
              </div>

              <p>{currentQuestion.explanation}</p>

              <div className="study-correct-answer">
                <span>正しい仕訳</span>

                <div>
                  <strong>{currentQuestion.debit}</strong>
                  <b>借方</b>
                  <span>
                    {currentQuestion.amount.toLocaleString("ja-JP")}円
                  </span>
                </div>

                <div>
                  <strong>{currentQuestion.credit}</strong>
                  <b>貸方</b>
                  <span>
                    {currentQuestion.amount.toLocaleString("ja-JP")}円
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 回答前：スキップと答え合わせ */}
          {!result || result.validationError ? (
            <>
              <button
                type="button"
                className="study-skip-button"
                onClick={handleSkip}
              >
                わからないので解説を見る
              </button>

              <button type="submit" className="study-primary-button">
                答え合わせする！
              </button>
            </>
          ) : (
            /* 回答後：次の問題へ */
            <button
              type="button"
              className="study-primary-button"
              onClick={handleNext}
            >
              {questionIndex === questions.length - 1
                ? "結果を見る"
                : "次の問題へ →"}
            </button>
          )}
        </form>

        <p className="study-encouragement">
          間違えても大丈夫。解説を読んで一歩ずつ覚えよう！
        </p>
      </div>
    </section>
  );
}

export default Study;
