import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";

function MatchListPage({ people = [], images }) {
  const navigate = useNavigate();

  return (
    <main className="mobile-page match-list-page">
      <section className="match-content">
        <h1 className="match-title">밥약 잡기</h1>

        <nav className="match-tabs" aria-label="밥약 필터">
          <button className="active" type="button">
            학과
          </button>
          <button type="button">관심주제</button>
          <button type="button">밥약상태</button>
        </nav>

        <div className="match-tab-line" />

        <div className="match-filter-row">
          <FilterChip label="문화지식융합대학교" />
          <FilterChip label="사회과학대학교" />
          <FilterChip label="자연정보과학대학교" muted />
        </div>

        <div className="match-card-list">
          {people.map((person) => (
            <button
              className="match-person-card"
              key={person.id}
              type="button"
              onClick={() => navigate("/detail", { state: { person } })}
            >
              <img className="match-person-image" src={person.image} alt="" />

              <div className="match-person-info">
                <div className="match-status-pill">
                  <span>{person.statusText}</span>
                  <i className={person.available ? "green" : "red"} />
                </div>

                <h2>{person.maskedName || person.name}</h2>

                <div className="match-person-tags">
                  {person.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <BottomNav images={images} />
    </main>
  );
}

function FilterChip({ label, muted = false }) {
  return (
    <button className={muted ? "match-filter muted" : "match-filter"} type="button">
      {label}
      {!muted && <span>×</span>}
    </button>
  );
}

export default MatchListPage;
