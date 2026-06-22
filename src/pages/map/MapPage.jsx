import BottomNav from "../../components/BottomNav";
import mapImage from "../../assets/images/2026-06-22 033940.png";
import styles from "./MapPage.module.css";

function MapPage() {
  return (
    <main className={styles.container}>
      <section className={styles.phoneFrame} aria-label="지도 화면">
        <img className={styles.mapImage} src={mapImage} alt="동덕여자대학교 주변 지도" />

        <div className={styles.searchBar}>
          <span className={styles.menuIcon}>☰</span>
          <span className={styles.searchText}>지도 검색</span>
          <span className={styles.targetIcon}>⌖</span>
        </div>

        <BottomNav />
      </section>
    </main>
  );
}

export default MapPage;
