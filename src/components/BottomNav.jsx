import { useNavigate, useLocation } from "react-router-dom";

function BottomNav({ images }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // ⭕ [핵심 안전장치] 만약 외부에서 images 주머니를 깜빡하고 안 주거나, 
  // 기존의 잘못된 경로가 들어와도 우리 프로젝트의 진짜 src 경로를 바라보도록 자동 매칭!
  const safeImages = {
    navBarBg: images?.navBarBg || "/src/assets/images/subtract.svg",       // 하단바 곡선 배경
    navMap: images?.navMap || "/src/assets/images/map.svg",             // 1. 맨 왼쪽 지도
    navChat: images?.navChat || "/src/assets/images/chat.svg",           // 2. 왼쪽에서 두번째 채팅
    navBapBg: images?.navBapBg || "/src/assets/images/bap_circle_bg.svg",  // 3. 가운데 버튼 배경
    navBap: images?.navBap || "/src/assets/images/bap.svg",             // 3. 가운데 버튼 아이콘 (마이페이지!)
    navFind: images?.navFind || "/src/assets/images/find.svg",           // 4. 오른쪽에서 두번째 돋보기 (매칭목록)
    navKnowledge: images?.navKnowledge || "/src/assets/images/knowledge.svg"  // 5. 맨 오른쪽 가이드북
  };

  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {/* 피그마 시안의 곡선을 표현하는 배경 이미지 */}
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

      {/* 3. ⭐ 가운데 큰 밥그릇 버튼: 마이페이지 홈으로 이동! */}
      <button 
        className="home-bowl" 
        type="button" 
        aria-label="마이페이지 홈"
        onClick={() => navigate("/mypage")}
      >
        <img className="home-bowl-bg" src={safeImages.navBapBg} alt="" />
        <img className="home-bowl-icon" src={safeImages.navBap} alt="" />
      </button>

      {/* 4. 그 옆 돋보기: 밥약 매칭 리스트 */}
      <img 
        className={`bottom-nav-icon ${currentPath === "/matching" ? "active" : ""}`} 
        src={safeImages.navFind} 
        alt="밥약 매칭 목록" 
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

export default BottomNav;