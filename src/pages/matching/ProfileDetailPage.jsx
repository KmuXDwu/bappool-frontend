import BackButton from "../../components/BackButton";
import CharacterImage from "../../components/CharacterImage";

function ProfileDetailPage({ person, onBack, onStartChat }) {
  return (
    <div className="mobile-page profile-detail-page">
      <BackButton onClick={onBack} />

      <section className="profile-card">
        <CharacterImage
          src={person.image}
          alt=""
          className="profile-character"
        />

        <h1>{person.fullName}</h1>
        <p>{person.gradeRole}</p>

        <article className="info-card">
          <h2>나의 프로필</h2>
          <ul>
            <li>학과 - {person.department}</li>
            <li>MBTI - {person.mbti}</li>
            <li>취미 - {person.hobby}</li>
            <li>나이 - {person.age}</li>
          </ul>
        </article>

        <article className="info-card">
          <h2>관심주제</h2>
          <div className="profile-tags">
            <span>학교 생활</span>
            <span>교환학생 / 대외활동</span>
          </div>
        </article>
      </section>

      <button
        className="large-orange-button"
        type="button"
        onClick={onStartChat}
      >
        밥약 신청하기
      </button>
    </div>
  );
}

export default ProfileDetailPage;
