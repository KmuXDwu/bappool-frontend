import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './MyPage.module.css';

// 1. 초기 덤 데이터 (기본 정보 고정)
const dummyUser = {
  name: '이연주',
  university: '국민대',      
  studentId: '26학번',       
  role: 'freshman',         
  department: '국어국문학과',  
  mbti: 'ENFJ',             
  age: '21살',              
  hobbies: ['뜨개질', '노래 부르기'],          // 수정 가능 (텍스트 입력)
  interests: ['학교 생활 🏫', '교환학생 / 대외활동 ✈️'], // ★ 수정 가능 (토글 선택)
};

// ★ 회원가입 페이지에서 제공하던 관심주제 전체 리스트 동일하게 세팅
const INTEREST_LIST = [
  "학교 생활 🏫",
  "교환학생 / 대외활동 ✈️",
  "동아리 / 학회 🎒",
  "자취 / 통학 🚶‍♂️",
  "과제 / 팀플 ✍️",
  "학과 공부 💯",
  "복수전공/전과/편입 😎",
];

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
  
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false); 

  // ★ 수정 가능 항목 전용 상태값
  const [editedHobbies, setEditedHobbies] = useState(user.hobbies.join(', '));
  const [editedInterests, setEditedInterests] = useState(user.interests); // 배열 형태로 바로 토글 관리

  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const dragMoved = useRef(false);

  const characterKey = `${user.university || '국민대'}-${user.role || 'freshman'}`;
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
    event.target.value = '';
  };

  // ★ 관심주제 토글 함수 (회원가입 로직과 동일)
  const toggleInterest = (item) => {
    if (editedInterests.includes(item)) {
      setEditedInterests(editedInterests.filter((v) => v !== item));
    } else {
      setEditedInterests([...editedInterests, item]);
    }
  };

  // 💾 프로필 수정 완료 (저장)
  const handleEditToggle = () => {
    if (isEditing) {
      const hobbiesArray = editedHobbies.split(',').map(item => item.trim()).filter(Boolean);

      setUser({
        ...user,
        hobbies: hobbiesArray,
        interests: editedInterests, // 토글 완료된 배열 저장
      });
    } else {
      // 수정 모드로 들어갈 때, 현재 저장된 user 정보를 상태값으로 동기화
      setEditedHobbies(user.hobbies.join(', '));
      setEditedInterests(user.interests);
    }
    setIsEditing(!isEditing);
  };

  const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  };

  const handleDragStart = (e) => {
    // input창이나 관심주제 토글 버튼 내부 요소를 클릭했을 때는 드래그 발동 안 되게 차단
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

    if (dragMoved.current && movedBy < -50 && currentPage === PAGE.PROFILE) {
      setCurrentPage(PAGE.TIMETABLE);
    } else if (dragMoved.current && movedBy > 50 && currentPage === PAGE.TIMETABLE) {
      setCurrentPage(PAGE.PROFILE);
    } else {
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
      <header className={styles.topBar}>
        <button type="button" className={styles.editButton} onClick={handleEditToggle}>
          {isEditing ? '저장 완료' : '프로필 수정'}
        </button>
      </header>

      <div className={styles.indicator}>
        <span className={`${styles.dot} ${currentPage === PAGE.PROFILE ? styles.dotActive : ''}`} />
        <span className={`${styles.dot} ${currentPage === PAGE.TIMETABLE ? styles.dotActive : ''}`} />
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
          
          {/* CARD 1: 프로필 카드 */}
          <section className={`${styles.card} ${styles.profileCard}`}>
            
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
              <h1 className={styles.userName}>{user.name}</h1>
              <p className={styles.userSub}>{user.studentId} {user.role === 'freshman' ? '새내기' : '선배'}</p>
            </div>

            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>📌 나의 프로필</p>
              <ul className={styles.infoList}>
                <li>학교 - {user.university || '국민대'}</li>
                <li>학과 - {user.department}</li>
                <li>MBTI - {user.mbti}</li>
                <li>나이 - {user.age}</li>
                <li>
                  취미 - {isEditing ? (
                    <input 
                      type="text" 
                      className={styles.editInputRow} 
                      value={editedHobbies} 
                      onChange={(e) => setEditedHobbies(e.target.value)} 
                      placeholder="쉼표(,)로 구분해서 입력"
                    />
                  ) : user.hobbies.join(', ')}
                </li>
              </ul>
            </div>

            {/* ★ 관심주제 구역: 수정 모드 돌입 시 회원가입처럼 토글 버튼 제공 */}
            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>📌 관심주제</p>
              <div className={styles.tagRow}>
                {isEditing ? (
                  // 수정 모드: 전체 리스트에서 선택된 요소만 오렌지색으로 활성화되는 토글형 버튼
                  INTEREST_LIST.map((item) => (
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
                ) : (
                  // 일반 모드: 현재 저장된 주제만 태그 뱃지로 깔끔하게 노출
                  user.interests.map((interest) => (
                    <span key={interest} className={styles.tag}>
                      {interest}
                    </span>
                  ))
                )}
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
        onClick={() => navigate("/ChatListPage")}
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