import { useNavigate } from "react-router-dom";
import { Menu, Crosshair, Heart } from "lucide-react"; // 상단 바용 아이콘들
import BottomNav from "../../components/BottomNav";
import styles from "./MapPage.module.css";

function MapPage() {
  const navigate = useNavigate();

  // 💡 이미지 넣는 팁: public/images/ 폴더에 시안 속 지도 캡처본을 저장해 두면 임시 UI로 완벽해!
  const mapPreviewImg = "/images/map_preview.png"; 

  return (
    <div className={styles.container}>
      
      {/* 1. 상단 플로팅 지도 검색 바 */}
      <div className={styles.searchBarWrap}>
        <div className={styles.searchBar}>
          <button className={styles.iconButton}>
            <Menu size={20} color="#555" />
          </button>
          <input 
            type="text" 
            placeholder="지도 검색" 
            className={styles.searchInput}
          />
          <button className={styles.iconButton}>
            <Crosshair size={20} color="#555" />
          </button>
        </div>
      </div>

      {/* 2. 우측 플로팅 찜(하트) 버튼 */}
      <button className={styles.heartButton}>
        <Heart size={20} color="#555" />
      </button>

      {/* 3. 지도 렌더링 구역 (여기에 나중에 API가 들어갈 거야) */}
      <div id="map" className={styles.mapContainer}>
        {/* API 연동 전까지 임시로 보여줄 지도 배경 이미지 */}
        <img 
          src={mapPreviewImg} 
          alt="지도 임시 배경" 
          className={styles.mapPreview}
          onError={(e) => {
            // 이미지 파일이 아직 없을 경우 개발하기 편하게 회색 배경 처리
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* 4. 공용 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
}

export default MapPage;