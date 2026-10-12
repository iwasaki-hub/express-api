import { Link } from "react-router-dom";
import "./Usage.css";

const steps = [
  {
    number: "01",
    title: "まずはアカウント登録",
    description:
      "アカウントを作成して、自分の学習を始めましょう。ログインすると、学習した記録をあとから振り返れます。",
    icon: "✦",
    color: "purple",
  },
  {
    number: "02",
    title: "仕訳問題にチャレンジ！",
    description:
      "取引の内容を読んで、勘定科目や金額を考えます。わからない問題はスキップして、無理なく進められます。",
    icon: "✎",
    color: "yellow",
  },
  {
    number: "03",
    title: "答え合わせと解説で理解する",
    description:
      "問題を解いたら、結果や解説を確認しましょう。正解だけでなく、間違えた問題から学ぶことも大切です。",
    icon: "✓",
    color: "pink",
  },
  {
    number: "04",
    title: "マイページで成長を振り返る",
    description:
      "学習履歴から、取り組んだ問題数や正答数、正答率などを確認。自分の学習を振り返る習慣につなげましょう。",
    icon: "↗",
    color: "green",
  },
];

function Usage() {
  return (
    <main className="usage-page">
      <div className="usage-container">
        <section className="usage-hero">
          <span className="usage-eyebrow">YOUR BOOKKEEPING JOURNEY</span>

          <h1>
            簿記の勉強を、
            <br />
            もっと楽しく。
          </h1>

          <p className="usage-hero-description">
            仕訳を解いて、理解して、振り返る。
            <br />
            小さな一歩を積み重ねていこう！
          </p>

          <div className="usage-hero-decoration" aria-hidden="true">
            <span>✦</span>
            <span>☻</span>
            <span>✎</span>
          </div>

          <Link to="/study" className="usage-primary-button">
            学習をはじめる <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="usage-section">
          <div className="usage-section-heading">
            <span className="usage-label">HOW TO USE</span>
            <h2>使い方は、かんたん4ステップ</h2>
            <p>自分のペースで大丈夫。 ひとつずつ取り組んでいきましょう。</p>
          </div>

          <div className="usage-steps">
            {steps.map((step) => (
              <article className="usage-step-card" key={step.number}>
                <div
                  className={`usage-step-icon ${step.color}`}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>

                <div className="usage-step-content">
                  <span className="usage-step-number">STEP {step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="usage-section usage-results">
          <span className="usage-label">YOUR PROGRESS</span>
          <h2>学習の積み重ねを、見える形に。</h2>
          <p>
            解いた問題や正答率を振り返ることで、
            自分がどこまで理解できたかを確認できます。
          </p>

          <div className="usage-result-grid">
            <article className="usage-result-card">
              <span className="usage-result-icon">◎</span>
              <h3>取り組んだ問題数</h3>
              <p>どれだけ学習したかを振り返ろう。</p>
            </article>

            <article className="usage-result-card">
              <span className="usage-result-icon">✓</span>
              <h3>正答数・正答率</h3>
              <p>問題への理解度を確認しよう。</p>
            </article>

            <article className="usage-result-card">
              <span className="usage-result-icon">↗</span>
              <h3>学習履歴</h3>
              <p>過去の学習を次の一歩につなげよう。</p>
            </article>
          </div>

          <p className="usage-note">
            ※ 学習結果は、実際に記録された学習データに基づいて表示されます。
          </p>
        </section>

        <section className="usage-cta">
          <span aria-hidden="true">✦ ✦ ✦</span>
          <h2>さっそく、1問解いてみよう！</h2>
          <p>完璧じゃなくて大丈夫。 今日の1問が、未来の自信につながります。</p>

          <Link to="/study" className="usage-primary-button">
            仕訳にチャレンジ！ →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Usage;
