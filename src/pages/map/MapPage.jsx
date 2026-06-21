import { useNavigate } from "react-router-dom";
import { Menu, Crosshair, Heart } from "lucide-react"; // 상단 바용 아이콘들
import BottomNav from "../../components/BottomNav";
import styles from "./MapPage.module.css";

function MapPage() {
  const navigate = useNavigate();

  // 💡 아래 URL의 'seoul' 부분에 원하는 기본 검색어나 위치를 넣어서 활용할 수 있습니다.
  const naverMapEmbedUrl = "https://map.naver.com/v5/search/seoul";

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

      {/* 3. 지도 렌더링 구역 (앱/웹 내에 네이버 지도 고정) */}
      <div id="map" className={styles.mapContainer}>
        <iframe
          src={naverMapEmbedUrl}
          title="네이버 지도"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* 4. 공용 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
}

export default MapPage;