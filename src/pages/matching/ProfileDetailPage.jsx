import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

function ProfileDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const person = location.state?.person;

  if (!person) {
    return (
      <div className="mobile-page profile-detail-page">
        <div style={{ padding: "16px" }}>
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <p style={{ textAlign: "center", marginTop: "40px" }}>유저 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleConfirmApply = () => {
    setIsApplied(true);
    setIsModalOpen(false);
  };

  return (
    <div className="mobile-page profile-detail-page" style={{ position: "relative", minHeight: "100vh" }}>
      
      <div style={{ padding: "16px 20px 8px 20px", display: "flex", alignItems: "center" }}>
        <BackButton onClick={() => navigate(-1)} />
      </div>

      <section className="profile-card" style={{ marginTop: "10px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" }}>
            <img 
              src={person.image} 
              alt="프로필 캐릭터" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              onError={(e) => {
                e.target.src = "https://api.iconify.design/fluent-emoji:hatching-chick.svg";
              }}
            />
          </div>
        </div>

        <h1>{person.name}</h1>
        <p>{person.statusText || "반갑습니다!"}</p>

        <article className="info-card">
          <h2>나의 프로필</h2>
          <ul>
            <li>학과 - {person.department || "미지정"}</li>
            <li>MBTI - {person.mbti || "공백"}</li>
            <li>취미 - {person.hobby || (person.tags && person.tags[0]) || "없음"}</li>
            <li>나이 - {person.age || "20대"}</li>
          </ul>
        </article>

        <article className="info-card">
          <h2>관심주제</h2>
          <div className="profile-tags">
            {person.tags && person.tags.length > 0 ? (
              person.tags.map((tag) => <span key={tag}>{tag}</span>)
            ) : (
              <>
                <span>학교 생활</span>
                <span>교환학생 / 대외활동</span>
              </>
            )}
          </div>
        </article>
      </section>

      {isApplied ? (
        <button
          className="large-orange-button"
          type="button"
          disabled
          style={{ backgroundColor: "#b2b2b2", cursor: "not-allowed", boxShadow: "none" }}
        >
          신청 완료
        </button>
      ) : (
        <button
          className="large-orange-button"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          밥약 신청하기
        </button>
      )}

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px", width: "280px", textAlign: "center", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)" }}>
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#4a3220", margin: "0 0 20px 0" }}>밥약을 신청하시겠습니까?</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                type="button" 
                style={{ flex: 1, padding: "10px 0", border: "1px solid #eaeaea", borderRadius: "8px", backgroundColor: "#ffffff", color: "#777777", fontWeight: "600", cursor: "pointer" }} 
                onClick={() => setIsModalOpen(false)}
              >
                아니오
              </button>
              <button 
                type="button" 
                style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: "8px", backgroundColor: "#ffa826", color: "#ffffff", fontWeight: "600", cursor: "pointer" }} 
                onClick={handleConfirmApply}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDetailPage;