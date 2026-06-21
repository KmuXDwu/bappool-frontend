import { useLocation, useNavigate } from "react-router-dom";

function BottomNav({ images }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const safeImages = {
    navBarBg: images?.navBarBg || "/src/assets/images/subtract.svg",
    navMap: images?.navMap || "/src/assets/images/map.svg",
    navChat: images?.navChat || "/src/assets/images/chat.svg",
    navBapBg: images?.navBapBg || "/src/assets/images/bap_circle_bg.svg",
    navBap: images?.navBap || "/src/assets/images/bap.svg",
    navFind: images?.navFind || "/src/assets/images/find.svg",
    navKnowledge: images?.navKnowledge || "/src/assets/images/knowledge.svg",
  };

  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      <img className="bottom-nav-bg" src={safeImages.navBarBg} alt="" />

      <img
        className={`bottom-nav-icon ${currentPath === "/map" ? "active" : ""}`}
        src={safeImages.navMap}
        alt="지도"
        onClick={() => navigate("/map")}
      />

      <img
        className={`bottom-nav-icon ${
          currentPath === "/messages" || currentPath === "/chat" ? "active" : ""
        }`}
        src={safeImages.navChat}
        alt="채팅"
        onClick={() => navigate("/messages")}
      />

      <button
        className="home-bowl"
        type="button"
        aria-label="마이페이지"
        onClick={() => navigate("/mypage")}
      >
        <img className="home-bowl-bg" src={safeImages.navBapBg} alt="" />
        <img className="home-bowl-icon" src={safeImages.navBap} alt="" />
      </button>

      <img
        className={`bottom-nav-icon ${
          currentPath === "/matching" ? "active" : ""
        }`}
        src={safeImages.navFind}
        alt="밥약 잡기"
        onClick={() => navigate("/matching")}
      />

      <img
        className={`bottom-nav-icon ${currentPath === "/guide" ? "active" : ""}`}
        src={safeImages.navKnowledge}
        alt="밥약 가이드"
        onClick={() => navigate("/guide")}
      />
    </nav>
  );
}

export default BottomNav;
