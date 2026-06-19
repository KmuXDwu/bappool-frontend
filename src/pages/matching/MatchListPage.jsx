import { useNavigate } from "react-router-dom"; // 👈 라우터 이동을 위해 추가!
import { BottomNav } from "../profile/MyPage"; // 👈 마이페이지에 있는 개조된 BottomNav를 깔끔하게 공유해 쓰기!
import FilterPill from "../../components/FilterPill";

function MatchListPage({ people, onSelectPerson }) {
  const navigate = useNavigate();

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
        {people && people.map((person) => (
          <button
            className="buddy-card"
            key={person.id}
            type="button"
            onClick={() => {
              if (onSelectPerson) {
                onSelectPerson(person);
              } else {
                // 라우터에서 연동한 기본 주소 이동
                navigate("/chat");
              }
            }}
          >
            {/* 💥 [에러 방어] CharacterImage 컴포넌트 대신 순수 img 태그로 가볍게 교체! */}
            <img
              src={person.image}
              alt=""
              className="buddy-avatar"
              onError={(e) => {
                // 혹시 선배 캐릭터 이미지가 깨질 때를 대비한 댕댕이/🐣 대체 아이콘
                e.target.src = "https://api.iconify.design/fluent-emoji:hatching-chick.svg";
              }}
            />

            <div className="buddy-info">
              <div className="availability">
                <span>{person.statusText}</span>
                <i className={person.available ? "green" : "red"} />
              </div>

              <h2>{person.name}</h2>

              <div className="tag-grid">
                {person.tags && person.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ⭕ 마이페이지에서 개조한 하단바를 그대로 불러와서 사용! (props 안 던져줘도 됨) */}
      <BottomNav />
    </div>
  );
}

export default MatchListPage;