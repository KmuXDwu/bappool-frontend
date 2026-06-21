import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProfileDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);

  const person = location.state?.person;

  if (!person) {
    return (
      <main className="mobile-page profile-detail-page">
        <button className="profile-back-button" type="button" onClick={() => navigate(-1)}>
          ←
        </button>
        <p className="profile-empty-text">프로필 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  const handleApply = () => {
    if (!person.available) {
      setShowUnavailableModal(true);
      return;
    }

    navigate("/chat", {
      state: {
        partner: person,
      },
    });
  };

  return (
    <main className="mobile-page profile-detail-page">
      <button className="profile-back-button" type="button" onClick={() => navigate(-1)}>
        ←
      </button>

      <section className="profile-detail-card">
        <img className="profile-detail-character" src={person.image} alt="" />

        <h1>{person.name}</h1>
        <p className="profile-detail-role">{person.gradeRole}</p>

        <article className="profile-info-box">
          <h2>📌 나의 프로필</h2>
          <ul>
            <li>학과 - {person.department}</li>
            <li>MBTI - {person.mbti}</li>
            <li>취미 - {person.hobby}</li>
            <li>나이 - {person.age}</li>
          </ul>
        </article>

        <article className="profile-info-box profile-topic-box">
          <h2>📌 관심주제</h2>
          <div>
            {(person.interests || person.tags).slice(0, 2).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <div className="profile-card-stamp" />
      </section>

      <button
        className={person.available ? "profile-apply-button" : "profile-apply-button disabled"}
        type="button"
        onClick={handleApply}
      >
        밥약 신청하기
      </button>

      {showUnavailableModal && (
        <div className="profile-modal-layer" onClick={() => setShowUnavailableModal(false)}>
          <section className="profile-modal" onClick={(event) => event.stopPropagation()}>
            <p>선배님이 현재 밥약이 불가능합니다.</p>
            <button type="button" onClick={() => setShowUnavailableModal(false)}>
              확인
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default ProfileDetailPage;
