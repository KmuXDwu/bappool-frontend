import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; // 뒤로가기 화살표 아이콘
import BottomNav from "../../components/BottomNav"; // ⭕ 작성자님의 공용 하단바 탑재!

function GuidePage() {
  const navigate = useNavigate();

  // 💡 작성자님 프로젝트의 src/assets/images에 보관 중인 가이드북 이미지 주소
  const images = {
    guideCharacter: "/src/assets/images/guide_character.png", // 상단 밥알 일러스트
    guideBg: "/src/assets/images/guide_bg.png",               // 하단 은은한 배경 그래픽
  };

  return (
    <div className="mobile-page guide-page" style={{ background: "#F9F9F9", minHeight: "100vh", position: "relative" }}>
      
      {/* 1. 상단 헤더 (뒤로가기 + 타이틀) */}
      <header className="chat-top" style={{ display: "flex", alignItems: "center", padding: "16px", borderBottom: "none", background: "transparent" }}>
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}
        >
          <ChevronLeft size={28} color="#333" />
        </button>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "8px", color: "#333" }}>
          밥약 가이드 북
        </h1>
      </header>

      {/* 2. 메인 콘텐츠 영역 */}
      <div className="guide-body" style={{ padding: "0 20px", paddingBottom: "120px" }}>
        <p className="guide-subtitle" style={{ color: "#888", fontSize: "14px", margin: "4px 0 24px 0" }}>
          새내기 밥약 꿀팁 주목!
        </p>

        {/* 밥알 캐릭터 배치 구역 */}
        <div className="guide-character-wrap" style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <img 
            src={images.guideCharacter} 
            alt="신입생 밥약 가이드 일러스트" 
            style={{ width: "70%", maxWidth: "220px", height: "auto" }}
            onError={(e) => {
              // 아직 폴더에 이미지가 없다면 엑박 뜨는 대신 임시로 귀여운 이모지로 대체
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* 꿀팁 카드 리스트 뭉치 */}
        <div className="guide-card-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* 카드 1: 스몰토크 */}
          <div 
            className="guide-card" 
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
          >
            <span style={{ fontSize: "24px", color: "#FFA826" }}>🔖</span>
            <div style={{ fontWeight: "600", color: "#333", fontSize: "15px", lineHeight: "1.4" }}>
              더이상 침묵은 그만!<br />스몰토크 주제 10가지
            </div>
          </div>

          {/* 카드 2: 밥약 예절 */}
          <div 
            className="guide-card" 
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
          >
            <span style={{ fontSize: "24px", color: "#FFA826" }}>🔖</span>
            <div style={{ fontWeight: "600", color: "#333", fontSize: "15px", lineHeight: "1.4" }}>
              밥약 예절 속성 익히기
            </div>
          </div>

        </div>
      </div>

      {/* 3. 공용 하단 네비게이션 배치 */}
      <BottomNav />
    </div>
  );
}

export default GuidePage;