import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react"; // X 아이콘 추가
import BottomNav from "../../components/BottomNav";

function GuidePage() {
  const navigate = useNavigate();

  // 💡 모달(팝업) 열림 상태 및 데이터 관리용 State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState([]);

  const images = {
    guideCharacter: "/src/assets/images/guide_character.png",
    guideBg: "/src/assets/images/guide_bg.png", 
  };

  // 💡 카드 클릭 시 팝업에 띄워줄 데이터 정의
  const guideData = {
    smalltalk: {
      title: "스몰토크 주제 10가지",
      list: [
        "1. 요즘 듣는 교양 수업 어때요?",
        "2. 통학하시나요, 자취하시나요?",
        "3. 가장 가보고 싶었던 교내 맛집이 있나요?",
        "4. 요즘 꽂힌 취미나 유튜브 채널 공유하기",
        "5. 전공을 선택하게 된 계기 물어보기",
        "6. 이번 주말이나 공강 때 뭐 하세요?",
        "7. MBTI나 성격 유형 이야기로 가볍게 시작!",
        "8. 요즘 가장 자주 듣는 노래나 플레이리스트",
        "9. 학교 축제나 동아리 관심 있는 곳 물어보기",
        "10. 고등학교 때랑 대학교 생활 가장 다른 점은?",
      ]
    },
    etiquette: {
      title: "밥약 예절 속성 익히기",
      list: [
        "1. 약속 시간 5분 전 도착은 기본 매너!",
        "2. 선배가 사주실 때는 감사 인사를 잊지 말기",
        "3. 메뉴를 고를 때는 너무 비싸지 않은 선에서 센스 있게",
        "4. 밥약이 끝난 후 '잘 먹었습니다' 문자 한 통 남기기",
        "5. 식사 중에는 스마트폰 멀리하고 대화에 집중하기",
        "6. 음식을 먹을 땐 쩝쩝 소리 내지 않도록 주의하기",
        "7. 다음 번에는 카페 음료나 가벼운 디저트 보답하기",
        "8. 선배의 조언을 들을 때는 경청하는 태도 보여주기",
        "9. 대화 주제가 너무 사적이거나 무겁지 않게 조절하기",
        "10. 약속을 잡을 때는 선배의 공강 시간을 먼저 배려하기",
      ]
    }
  };

  // 카드를 누르면 실행되는 함수
  const openGuide = (type) => {
    setModalTitle(guideData[type].title);
    setModalContent(guideData[type].list);
    setModalOpen(true);
  };

  return (
    <div className="mobile-page guide-page" style={{ background: "#F4F4F4", minHeight: "100vh", position: "relative", fontFamily: "sans-serif" }}>
      
      {/* 1. 상단 헤더 */}
      <header className="chat-top" style={{ display: "flex", alignItems: "center", padding: "16px", background: "transparent" }}>
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}
        >
          <ChevronLeft size={28} color="#333" />
        </button>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", marginLeft: "8px", color: "#333" }}>
          밥약 가이드 북
        </h1>
      </header>

      {/* 2. 메인 콘텐츠 영역 */}
      <div className="guide-body" style={{ padding: "0 24px", paddingBottom: "120px" }}>
        <p className="guide-subtitle" style={{ color: "#666", fontSize: "15px", margin: "4px 0 24px 0", fontWeight: "500" }}>
          새내기 밥약 꿀팁 주목!
        </p>

        {/* 캐릭터 배치 구역 */}
        <div className="guide-character-wrap" style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <img 
            src={images.guideCharacter} 
            alt="신입생 밥약 가이드 일러스트" 
            style={{ width: "75%", maxWidth: "240px", height: "auto" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* 꿀팁 카드 리스트 */}
        <div className="guide-card-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* 카드 1: 스몰토크 */}
          <div 
            className="guide-card" 
            onClick={() => openGuide("smalltalk")}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 24px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            {/* 디자인 시안 속 북마크 리본 구현 */}
            <div style={{
              position: "absolute", left: "24px", top: 0,
              width: "18px", height: "28px",
              background: "#FFB834",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)"
            }} />
            <div style={{ fontWeight: "700", color: "#333", fontSize: "16px", lineHeight: "1.5", marginLeft: "28px" }}>
              더이상 침묵은 그만!<br />스몰토크 주제 10가지
            </div>
          </div>

          {/* 카드 2: 밥약 예절 */}
          <div 
            className="guide-card" 
            onClick={() => openGuide("etiquette")}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 24px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            {/* 북마크 리본 */}
            <div style={{
              position: "absolute", left: "24px", top: 0,
              width: "18px", height: "28px",
              background: "#FFB834",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)"
            }} />
            <div style={{ fontWeight: "700", color: "#333", fontSize: "16px", lineHeight: "1.5", marginLeft: "28px" }}>
              밥약 예절 속성 익히기
            </div>
          </div>

        </div>
      </div>

      {/* 3. 은은한 하단 배경 일러스트 (디자인 시안 하단 밥알들) */}
      <div style={{ position: "absolute", bottom: "80px", left: 0, width: "100%", zIndex: 0, pointerEvents: "none", opacity: 0.8 }}>
        <img src={images.guideBg} style={{ width: "100%", height: "auto" }} onError={(e) => e.target.style.display="none"} />
      </div>

      {/* 4. 10계명 모달 팝업창 창 구현 */}
      {modalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 999
        }}>
          {/* 하단에서 슥 올라오는 느낌의 바텀 시트 스타일 */}
          <div style={{
            background: "#fff", width: "100%", borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "24px", maxHeight: "80vh", overflowY: "auto", boxSizing: "border-box"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>{modalTitle}</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} color="#666" />
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "20px" }}>
              {modalContent.map((item, index) => (
                <div key={index} style={{
                  background: "#F9F9F9", padding: "14px 16px", borderRadius: "12px",
                  fontSize: "14px", color: "#444", fontWeight: "500", lineHeight: "1.4"
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. 공용 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
}

export default GuidePage;