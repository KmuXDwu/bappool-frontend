import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // 작성자님 프로젝트의 실제 src 경로 매칭
  const safeImages = {
    navBarBg: "/src/assets/images/subtract.svg",       // 하단바 곡선 배경
    navMap: "/src/assets/images/map.svg",             // 1. 맨 왼쪽 지도
    navChat: "/src/assets/images/chat.svg",           // 2. 왼쪽에서 두번째 채팅
    navBapBg: "/src/assets/images/bap_circle_bg.svg",  // 3. 가운데 버튼 배경
    navBap: "/src/assets/images/bap.svg",             // 3. 가운데 버튼 아이콘 (마이페이지로 사용!)
    navFind: "/src/assets/images/find.svg",           // 4. 오른쪽에서 두번째 돋보기 (매칭목록)
    navKnowledge: "/src/assets/images/knowledge.svg"  // 5. 맨 오른쪽 가이드북
  };

  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {/* 하단바 배경 그래픽 */}
      <img className="bottom-nav-bg" src={safeImages.navBarBg} alt="" />

      {/* 1. 맨 왼쪽: 지도 */}
      <img 
        className={`bottom-nav-icon ${currentPath === "/map" ? "active" : ""}`} 
        src={safeImages.navMap} 
        alt="지도" 
        onClick={() => navigate("/map")}
        style={{ cursor: "pointer" }}
      />

      {/* 2. 그 옆: 채팅 */}
      <img 
        className={`bottom-nav-icon ${currentPath === "/chat" ? "active" : ""}`} 
        src={safeImages.navChat} 
        alt="채팅" 
        onClick={() => navigate("/chat")}
        style={{ cursor: "pointer" }}
      />

      {/* 3. ⭐ 가운데 밥그릇 버튼: 마이페이지로 순간이동! */}
      <button 
        className="home-bowl" 
        type="button" 
        aria-label="마이페이지 홈"
        onClick={() => navigate("/mypage")}
      >
        <img className="home-bowl-bg" src={safeImages.navBapBg} alt="" />
        <img className="home-bowl-icon" src={safeImages.navBap} alt="" />
      </button>

      {/* 4. 그 옆 돋보기: 밥약 매칭 목록 */}
      <img 
        className={`bottom-nav-icon ${currentPath === "/matching" ? "active" : ""}`} 
        src={safeImages.navFind} 
        alt="밥약 매칭" 
        onClick={() => navigate("/matching")}
        style={{ cursor: "pointer" }}
      />

      {/* 5. 맨 오른쪽: 새내기 밥약 가이드북 */}
      <img 
        className={`bottom-nav-icon ${currentPath === "/guide" ? "active" : ""}`} 
        src={safeImages.navKnowledge} 
        alt="밥약 가이드북" 
        onClick={() => navigate("/guide")}
        style={{ cursor: "pointer" }}
      />
    </nav>
  );
}