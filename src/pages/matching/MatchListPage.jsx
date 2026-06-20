import { useNavigate } from "react-router-dom";
import { BottomNav } from "../profile/MyPage";
import FilterPill from "../../components/FilterPill";

function MatchListPage({ people }) {
  const navigate = useNavigate();

  // 실명 마스킹 처리 함수 (이연주 -> 이*주 / 독고영재 -> 독**재)
  const getMaskedName = (name) => {
    if (!name) return "";
    if (name.length <= 2) return name[0] + "*";
    if (name.length === 3) return name[0] + "*" + name[2];
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
  };

  return (
    <div className="mobile-page match-list-page">
      <h1 className="main-title">밥약 잡기</h1>

      <div className="category-tabs">
        <button className="active" type="button">
          학과
        </button>
        <button type="button">관심주제</button>
        <button type="button">밥약상태</button>
      </div>

      <div className="filter-line">
        <FilterPill label="문화지식융합대학교" />
        <FilterPill label="사회과학대학교" />
        <FilterPill label="자연정보과학대학교" muted />
      </div>

      <div className="buddy-list">
        {people &&
          people.map((person) => {
            const maskedName = getMaskedName(person.name);

            return (
              <button
                className="buddy-card"
                key={person.id}
                type="button"
                onClick={() => {
                  // 상위 컴포넌트 가로채기 차단하고 무조건 detail 페이지로 매칭 데이터 전송
                  navigate("/detail", {
                    state: {
                      person: {
                        ...person,
                        name: maskedName, // 마스킹된 이름을 들고 상세페이지로 진입
                      },
                    },
                  });
                }}
              >
                <img
                  src={person.image}
                  alt=""
                  className="buddy-avatar"
                  onError={(e) => {
                    e.target.src =
                      "https://api.iconify.design/fluent-emoji:hatching-chick.svg";
                  }}
                />

                <div className="buddy-info">
                  <div className="availability">
                    <span>{person.statusText}</span>
                    <i className={person.available ? "green" : "red"} />
                  </div>

                  {/* 리스트 화면에서도 실명 마스킹 처리 노출 */}
                  <h2>{maskedName}</h2>

                  <div className="tag-grid">
                    {person.tags &&
                      person.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </button>
            );
          })}
      </div>

      <BottomNav images={images} />
    </div>
  );
}

export default MatchListPage;
