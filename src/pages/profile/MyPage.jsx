import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './MyPage.module.css';

// 1. 초기 덤 데이터 (나중에 이 구조대로 API 데이터를 받으시면 됩니다)
const dummyUser = {
  name: '이연주',
  university: '국민대',      // '국민대' 또는 '동덕여대'
  studentId: '26학번',
  role: 'freshman',         // 'freshman'(후배) 또는 'senior'(선배)
  department: '국어국문학과',
  mbti: 'ENFJ',
  hobbies: ['뜨개질', '노래 부르기'],
  age: '21살',
  interests: ['학교 생활', '교환학생 / 대외활동'],
};

// 2. 🎨 자동 매칭될 학교별 캐릭터 이미지 매핑 테이블
const CHARACTER_IMAGES = {
  '국민대-senior': '/src/assets/images/kmu_senior.png',   
  '국민대-freshman': '/src/assets/images/kmu_freshman.png', 
  '동덕여대-senior': '/src/assets/images/dwu_senior.png', 
  '동덕여대-freshman': '/src/assets/images/dwu_freshman.png', 
};

const PAGE = {
  PROFILE: 0,
  TIMETABLE: 1,
};

export default function MyPage({ initialUser = dummyUser }) {
  const [currentPage, setCurrentPage] = useState(PAGE.PROFILE);
  const [timetableImage, setTimetableImage] = useState(null);
  
  // 📝 프로필 수정 관련 상태들
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editedName, setEditedName] = useState(user.name);
  const [editedDept, setEditedDept] = useState(user.department);
  const [editedMbti, setEditedMbti] = useState(user.mbti);

  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  
  // 드래그(슬라이드) 판별용 Refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const dragMoved = useRef(false); // 🔥 진짜 드래그를 했는지 판별하는 변수 (클릭 씹힘 방지)

  // 🔄 정보 기반 캐릭터 자동 고정 계산
  const characterKey = `${user.university || '국민대'}-${user.role || 'freshman'}`;
  const currentCharacterImg = CHARACTER_IMAGES[characterKey];

  // 📁 시간표 파일 업로드 처리
  const handleSelectFile = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setTimetableImage(reader.result);
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  // 💾 프로필 수정 완료 (저장) 버튼 토글
  const handleEditToggle = () => {
    if (isEditing) {
      // 저장할 때 데이터 업데이트 (나중에 여기에 API PATCH 요청을 넣으면 됩니다)
      setUser({
        ...user,
        name: editedName,
        department: editedDept,
        mbti: editedMbti,
      });
    }
    setIsEditing(!isEditing);
  };

  // 🖱️ 드래그앤드롭 슬라이더 로직 (버그 원천 차단 버전)
  const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  };

  const handleDragStart = (e) => {
    // input창이나 button 내부 요소를 클릭했을 때는 드래그 발동 안 되게 차단
    if (e.target.tagName === 'INPUT' || e.target.closest('button')) return;
    
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = getPositionX(e);
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const currentX = getPositionX(e);
    const diff = currentX - startX.current;
    
    // 유저가 5픽셀 이상 마우스를 움직였다면 클릭이 아니라 '드래그'로 판별
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

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const width = containerRef.current?.offsetWidth || 0;
    const movedBy = currentTranslate.current - (-currentPage * (width + 20));

    // 드래그가 크게 일어났을 때만 페이지 전환
    if (dragMoved.current && movedBy < -50 && currentPage === PAGE.PROFILE) {
      setCurrentPage(PAGE.TIMETABLE);
    } else if (dragMoved.current && movedBy > 50 && currentPage === PAGE.TIMETABLE) {
      setCurrentPage(PAGE.PROFILE);
    } else {
      // 제자리 슬라이드 리셋
      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 0.3s ease-out';
        containerRef.current.style.transform = `translateX(${-currentPage * (width + 20)}px)`;
      }
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
      {/* 💾 상단 프로필 수정/저장 바 */}
      <header className={styles.topBar}>
        <button type="button" className={styles.editButton} onClick={handleEditToggle}>
          {isEditing ? '저장 완료' : '프로필 수정'}
        </button>
      </header>

      {/* 인디케이터 */}
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
            
            {/* 🔒 유저 정보를 받아 고정된 캐릭터 영역 */}
            <div className={styles.characterWrap}>
              <div className={styles.characterPlaceholder}>
                {currentCharacterImg ? (
                  <img src={currentCharacterImg} alt="나의 캐릭터" className={styles.characterImage} />
                ) : (
                  <span className={styles.characterEmoji}>🐣</span>
                )}
              </div>
            </div>

            <div className={styles.nameBlock}>
              {isEditing ? (
                <input 
                  type="text" 
                  className={styles.editInputName} 
                  value={editedName} 
                  onChange={(e) => setEditedName(e.target.value)} 
                />
              ) : (
                <h1 className={styles.userName}>{user.name}</h1>
              )}
              <p className={styles.userSub}>{user.studentId} {user.role === 'freshman' ? '새내기' : '선배'}</p>
            </div>

            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>📌 나의 프로필</p>
              <ul className={styles.infoList}>
                <li>학교 - {user.university || '국민대'}</li>
                <li>
                  학과 - {isEditing ? (
                    <input 
                      type="text" 
                      className={styles.editInputRow} 
                      value={editedDept} 
                      onChange={(e) => setEditedDept(e.target.value)} 
                    />
                  ) : user.department}
                </li>
                <li>
                  MBTI - {isEditing ? (
                    <input 
                      type="text" 
                      className={styles.editInputRow} 
                      value={editedMbti} 
                      onChange={(e) => setEditedMbti(e.target.value)} 
                    />
                  ) : user.mbti}
                </li>
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

            {/* 🔥 dragMoved 필터링 덕분에 이제 시원시원하게 클릭 작동함 */}
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

  const safeImages = {
    navBarBg: "/src/assets/images/subtract.svg",       
    navMap: "/src/assets/images/map.svg",             
    navChat: "/src/assets/images/chat.svg",           
    navBapBg: "/src/assets/images/bap_circle_bg.svg",  
    navBap: "/src/assets/images/bap.svg",             
    navFind: "/src/assets/images/find.svg",           
    navKnowledge: "/src/assets/images/knowledge.svg"  
  };

  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      <img className="bottom-nav-bg" src={safeImages.navBarBg} alt="" />
      <img 
        className={`bottom-nav-icon ${currentPath === "/map" ? "active" : ""}`} 
        src={safeImages.navMap} 
        alt="지도" 
        onClick={() => navigate("/map")}
        style={{ cursor: "pointer" }}
      />
      <img 
        className={`bottom-nav-icon ${currentPath === "/chat" ? "active" : ""}`} 
        src={safeImages.navChat} 
        alt="채팅" 
        onClick={() => navigate("/chat")}
        style={{ cursor: "pointer" }}
      />
      <button 
        className="home-bowl" 
        type="button" 
        aria-label="마이페이지 홈"
        onClick={() => navigate("/mypage")}
      >
        <img className="home-bowl-bg" src={safeImages.navBapBg} alt="" />
        <img className="home-bowl-icon" src={safeImages.navBap} alt="" />
      </button>
      <img 
        className={`bottom-nav-icon ${currentPath === "/matching" ? "active" : ""}`} 
        src={safeImages.navFind} 
        alt="밥약 매칭" 
        onClick={() => navigate("/matching")}
        style={{ cursor: "pointer" }}
      />
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