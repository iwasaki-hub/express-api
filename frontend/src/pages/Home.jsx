import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-container">
        {/* =========================
            Header
        ========================= */}

        <header className="home-header">
          <div>
            <p className="home-eyebrow">BOOKKEEPING STUDY</p>

            <h1>
              今日も
              <br />
              簿記をやろう。
            </h1>

            <p className="home-description">
              少しずつで大丈夫。
              <br />
              1問ずつ、仕訳を身につけよう。
            </p>
          </div>

          <div className="home-header-shape">
            <span>✦</span>
          </div>
        </header>

        {/* =========================
            Today's Study
        ========================= */}

        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <p className="home-section-label">TODAY</p>
              <h2>今日の学習</h2>
            </div>

            <span className="home-section-number">01</span>
          </div>

          <Link to="/study" className="home-study-card">
            <div className="home-study-card-content">
              <span className="home-study-badge">おすすめ</span>

              <h3>
                仕訳問題に
                <br />
                チャレンジする
              </h3>

              <p>
                まずは1問。
                <br />
                今日の仕訳を解いてみよう。
              </p>

              <span className="home-card-button">
                学習をはじめる
                <span>→</span>
              </span>
            </div>

            <div className="home-study-shape">
              <span>￥</span>
            </div>
          </Link>
        </section>

        {/* =========================
            Progress
        ========================= */}

        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <p className="home-section-label">YOUR PROGRESS</p>
              <h2>学習状況</h2>
            </div>

            <span className="home-section-number">02</span>
          </div>

          <div className="home-progress-grid">
            <div className="home-progress-card home-progress-card-orange">
              <span className="home-progress-icon">🔥</span>

              <p>連続学習</p>

              <strong>
                7<span>日</span>
              </strong>

              <small>この調子！</small>
            </div>

            <div className="home-progress-card home-progress-card-purple">
              <span className="home-progress-icon">✓</span>

              <p>今月の正解数</p>

              <strong>
                42<span>問</span>
              </strong>

              <small>着実に成長中</small>
            </div>

            <div className="home-progress-card home-progress-card-green">
              <span className="home-progress-icon">◎</span>

              <p>正解率</p>

              <strong>
                78<span>%</span>
              </strong>

              <small>いい感じ！</small>
            </div>
          </div>
        </section>

        {/* =========================
            Categories
        ========================= */}

        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <p className="home-section-label">LEARN</p>
              <h2>何を勉強する？</h2>
            </div>

            <span className="home-section-number">03</span>
          </div>

          <div className="home-category-grid">
            <Link
              to="/study"
              className="home-category-card home-category-orange"
            >
              <span className="home-category-icon">🧾</span>

              <div>
                <span className="home-category-label">ACCOUNTING</span>

                <h3>仕訳</h3>

                <p>取引を正しく仕訳しよう</p>
              </div>

              <span className="home-category-arrow">↗</span>
            </Link>

            <Link
              to="/study"
              className="home-category-card home-category-purple"
            >
              <span className="home-category-icon">📦</span>

              <div>
                <span className="home-category-label">MERCHANDISE</span>

                <h3>商品売買</h3>

                <p>売上・仕入をマスター</p>
              </div>

              <span className="home-category-arrow">↗</span>
            </Link>

            <Link
              to="/study"
              className="home-category-card home-category-green"
            >
              <span className="home-category-icon">🏢</span>

              <div>
                <span className="home-category-label">COMPANY</span>

                <h3>会社・株式</h3>

                <p>株式会社の仕組みを学ぶ</p>
              </div>

              <span className="home-category-arrow">↗</span>
            </Link>

            <Link
              to="/study"
              className="home-category-card home-category-yellow"
            >
              <span className="home-category-icon">💰</span>

              <div>
                <span className="home-category-label">MONEY</span>

                <h3>現金・預金</h3>

                <p>お金の流れを理解する</p>
              </div>

              <span className="home-category-arrow">↗</span>
            </Link>
          </div>
        </section>

        {/* =========================
            Footer Message
        ========================= */}

        <section className="home-message">
          <span>✦</span>

          <p>
            完璧じゃなくていい。
            <br />
            今日の1問を積み重ねよう。
          </p>

          <span>✦</span>
        </section>
      </div>
    </div>
  );
}

export default Home;
