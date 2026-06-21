import { useEffect, useRef, useState } from "react";
import BottomNav from "../../components/BottomNav";
import styles from "./MyPage.module.css";

const dummyUser = {
  name: "이연주",
  university: "국민대",
  studentId: "26학번",
  role: "freshman",
  department: "국어국문학과",
  mbti: "ENFJ",
  age: "21살",
  hobbies: ["뜨개질", "노래 부르기"],
  interests: ["학교 생활", "교환학생 / 대외활동"],
};

const INTEREST_LIST = [
  "학교 생활",
  "교환학생 / 대외활동",
  "동아리 / 학회",
  "자취 / 통학",
  "과제 / 시험",
  "학과 공부",
  "복수전공 / 전과 / 편입",
];

const CHARACTER_IMAGES = {
  "국민대-senior": "/src/assets/images/kmu_senior.png",
  "국민대-freshman": "/src/assets/images/kmu_freshman.png",
  "동덕여대-senior": "/src/assets/images/dwu_senior.png",
  "동덕여대-freshman": "/src/assets/images/dwu_freshman.png",
};

const PAGE = {
  PROFILE: 0,
  TIMETABLE: 1,
};

function MyPage({ initialUser = dummyUser }) {
  const [currentPage, setCurrentPage] = useState(PAGE.PROFILE);
  const [timetableImage, setTimetableImage] = useState(null);
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHobbies, setEditedHobbies] = useState(user.hobbies.join(", "));
  const [editedInterests, setEditedInterests] = useState(user.interests);

  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const dragMoved = useRef(false);

  const characterKey = `${user.university || "국민대"}-${user.role || "freshman"}`;
  const currentCharacterImg = CHARACTER_IMAGES[characterKey];

  const handleSelectFile = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setTimetableImage(reader.result);
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const toggleInterest = (item) => {
    setEditedInterests((prev) =>
      prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item],
    );
  };

  const handleEditToggle = () => {
    if (isEditing) {
      const hobbiesArray = editedHobbies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      setUser({
        ...user,
        hobbies: hobbiesArray,
        interests: editedInterests,
      });
    } else {
      setEditedHobbies(user.hobbies.join(", "));
      setEditedInterests(user.interests);
    }

    setIsEditing((prev) => !prev);
  };

  const getPositionX = (event) => {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
  };

  const handleDragStart = (event) => {
    if (event.target.tagName === "INPUT" || event.target.closest("button")) return;

    isDragging.current = true;
    dragMoved.current = false;
    startX.current = getPositionX(event);
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
    }
  };

  const handleDragMove = (event) => {
    if (!isDragging.current) return;

    const currentX = getPositionX(event);
    const diff = currentX - startX.current;

    if (Math.abs(diff) > 5) {
      dragMoved.current = true;
    }

    const width = containerRef.current?.offsetWidth || 0;
    const currentPosition = -currentPage * (width + 20);
    currentTranslate.current = currentPosition + diff;

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const width = containerRef.current?.offsetWidth || 0;
    const movedBy = currentTranslate.current - -currentPage * (width + 20);

    if (dragMoved.current && movedBy < -50 && currentPage === PAGE.PROFILE) {
      setCurrentPage(PAGE.TIMETABLE);
      return;
    }

    if (dragMoved.current && movedBy > 50 && currentPage === PAGE.TIMETABLE) {
      setCurrentPage(PAGE.PROFILE);
      return;
    }

    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.3s ease-out";
      containerRef.current.style.transform = `translateX(${-currentPage * (width + 20)}px)`;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth || 0;
      containerRef.current.style.transition = "transform 0.3s ease-out";
      containerRef.current.style.transform = `translateX(${-currentPage * (width + 20)}px)`;
    }
  }, [currentPage]);

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button type="button" className={styles.editButton} onClick={handleEditToggle}>
          {isEditing ? "저장 완료" : "프로필 수정"}
        </button>
      </header>

      <div className={styles.indicator}>
        <span className={`${styles.dot} ${currentPage === PAGE.PROFILE ? styles.dotActive : ""}`} />
        <span className={`${styles.dot} ${currentPage === PAGE.TIMETABLE ? styles.dotActive : ""}`} />
      </div>

      <div
        className={styles.sliderViewport}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div ref={containerRef} className={styles.sliderTrack}>
          <section className={`${styles.card} ${styles.profileCard}`}>
            <div className={styles.characterWrap}>
              <div className={styles.characterPlaceholder}>
                {currentCharacterImg ? (
                  <img src={currentCharacterImg} alt="나의 캐릭터" className={styles.characterImage} />
                ) : (
                  <span className={styles.characterEmoji}>밥</span>
                )}
              </div>
            </div>

            <div className={styles.nameBlock}>
              <h1 className={styles.userName}>{user.name}</h1>
              <p className={styles.userSub}>
                {user.studentId} {user.role === "freshman" ? "새내기" : "선배"}
              </p>
            </div>

            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>나의 프로필</p>
              <ul className={styles.infoList}>
                <li>학교 - {user.university || "국민대"}</li>
                <li>학과 - {user.department}</li>
                <li>MBTI - {user.mbti}</li>
                <li>나이 - {user.age}</li>
                <li>
                  취미 -{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      className={styles.editInputRow}
                      value={editedHobbies}
                      onChange={(e) => setEditedHobbies(e.target.value)}
                      placeholder="쉼표(,)로 구분해서 입력"
                    />
                  ) : (
                    user.hobbies.join(", ")
                  )}
                </li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>관심주제</p>
              <div className={styles.tagRow}>
                {isEditing
                  ? INTEREST_LIST.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`${styles.interestToggleButton} ${
                          editedInterests.includes(item) ? styles.selected : ""
                        }`}
                        onClick={() => toggleInterest(item)}
                      >
                        {item}
                      </button>
                    ))
                  : user.interests.map((interest) => (
                      <span key={interest} className={styles.tag}>
                        {interest}
                      </span>
                    ))}
              </div>
            </div>

            <div className={styles.cardBgDeco} />
          </section>

          <section className={`${styles.card} ${styles.timetableCard}`}>
            <h2 className={styles.timetableTitle}>2026년 1학기 시간표</h2>

            <button type="button" className={styles.uploadArea} onClick={handleSelectFile}>
              {timetableImage ? (
                <img src={timetableImage} alt="시간표" className={styles.timetablePreviewImg} />
              ) : (
                <div className={styles.uploadEmpty}>
                  <span className={styles.uploadIcon}>+</span>
                  <p>시간표 이미지를 업로드해주세요</p>
                </div>
              )}
            </button>
          </section>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleFileChange}
      />

      <BottomNav />
    </div>
  );
}

export default MyPage;
