import { useRef, useState, useEffect } from 'react';
import styles from './MyPage.module.css';

const dummyUser = {
  name: '이연주',
  studentId: '26학번',
  role: 'freshman',
  department: '국어국문학과',
  mbti: 'ENFJ',
  hobbies: ['뜨개질', '노래 부르기'],
  age: '21살',
  interests: ['학교 생활', '교환학생 / 대외활동'],
};

const PAGE = {
  PROFILE: 0,
  TIMETABLE: 1,
};

export default function MyPage({ user = dummyUser }) {
  const [currentPage, setCurrentPage] = useState(PAGE.PROFILE);
  const [timetableImage, setTimetableImage] = useState(null);
  const fileInputRef = useRef(null);

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  const handleSelectFile = () => fileInputRef.current?.click();
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setTimetableImage(reader.result);
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  };

  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = getPositionX(e);
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const currentX = getPositionX(e);
    const diff = currentX - startX.current;
    
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
    const movedBy = currentTranslate.current - (-currentPage * (width + 20));

    if (movedBy < -50 && currentPage === PAGE.PROFILE) {
      setCurrentPage(PAGE.TIMETABLE);
    } else if (movedBy > 50 && currentPage === PAGE.TIMETABLE) {
      setCurrentPage(PAGE.PROFILE);
    } else {
      setCurrentPage(currentPage);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth || 0;
      containerRef.current.style.transition = 'transform 0.3s ease-out';
      containerRef.current.style.transform = `translateX(${-currentPage * (width + 20)}px)`;
    }
  }, [currentPage]);

  return (
    <div className={styles.page}>
      {/* 상단 프로필 수정 바 */}
      <header className={styles.topBar}>
        <button type="button" className={styles.editButton}>
          프로필 수정
        </button>
      </header>

      {/* 📌 카드가 아닌 상위 고정 영역으로 완전히 탈출한 인디케이터 */}
      <div className={styles.indicator}>
        <span className={`${styles.dot} ${currentPage === PAGE.PROFILE ? styles.dotActive : ''}`} />
        <span className={`${styles.dot} ${currentPage === PAGE.TIMETABLE ? styles.dotActive : ''}`} />
      </div>

      {/* 전체 슬라이더 뷰포트 영역 */}
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
          
          {/* CARD 1: 프로필 카드 */}
          <section className={`${styles.card} ${styles.profileCard}`}>
            <div className={styles.characterWrap}>
              <div className={styles.characterPlaceholder}>
                <span className={styles.characterEmoji}>🐣</span>
              </div>
            </div>

            <div className={styles.nameBlock}>
              <h1 className={styles.userName}>{user.name}</h1>
              <p className={styles.userSub}>{user.studentId} 새내기</p>
            </div>

            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>📌 나의 프로필</p>
              <ul className={styles.infoList}>
                <li>학과 - {user.department}</li>
                <li>MBTI - {user.mbti}</li>
                <li>취미 - {user.hobbies.join(', ')}</li>
                <li>나이 - {user.age}</li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>📌 관심주제</p>
              <div className={styles.tagRow}>
                {user.interests.map((interest) => (
                  <span key={interest} className={styles.tag}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className={styles.cardBgDeco} />
          </section>

          {/* CARD 2: 시간표 카드 */}
          <section className={`${styles.card} ${styles.timetableCard}`}>
            <h2 className={styles.timetableTitle}>2026년 1학기 시간표</h2>

            <button type="button" className={styles.uploadArea} onClick={handleSelectFile}>
              {timetableImage ? (
                <img src={timetableImage} alt="시간표" className={styles.timetablePreviewImg} />
              ) : (
                <div className={styles.uploadEmpty}>
                  <span className={styles.uploadIcon}>＋</span>
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

function BottomNav() {
  return (
    <nav className={styles.bottomNavWrap}>
      <button type="button" className={styles.centerButton} aria-label="홈">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
          <path d="M3 12h18a9 9 0 0 1-18 0Z" stroke="#F5A623" strokeWidth="2" />
          <path d="M12 12V7" stroke="#F5A623" strokeWidth="2" />
          <circle cx="12" cy="10" r="1" fill="#F5A623" />
          <circle cx="9" cy="10" r="1" fill="#F5A623" />
          <circle cx="15" cy="10" r="1" fill="#F5A623" />
        </svg>
      </button>

      <div className={styles.bottomNav}>
        <button type="button" className={styles.navItem}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
            <path d="M9 4v14M15 6v14" />
          </svg>
        </button>

        <button type="button" className={styles.navItem}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        <div className={styles.navItemSpacer} />

        <button type="button" className={styles.navItem}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>

        <button type="button" className={styles.navItem}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}