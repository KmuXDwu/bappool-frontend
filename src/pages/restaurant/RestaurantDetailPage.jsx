import { useNavigate, useParams } from "react-router-dom";

import { RESTAURANTS } from "./RestaurantListPage";

function RestaurantDetailPage() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const restaurant = RESTAURANTS.find((item) => item.id === restaurantId);

  if (!restaurant) {
    return (
      <main className="mobile-page restaurant-detail-page">
        <button className="restaurant-detail-back" type="button" onClick={() => navigate(-1)}>
          ←
        </button>
        <p className="restaurant-empty">가게 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="mobile-page restaurant-detail-page">
      <button className="restaurant-detail-back" type="button" onClick={() => navigate(-1)}>
        ←
      </button>

      <div className={`restaurant-detail-hero ${restaurant.imageClass}`} />

      <section className="restaurant-detail-card">
        <h1>{restaurant.name}</h1>
        <p>{restaurant.address}</p>

        <dl>
          <div>
            <dt>대표 메뉴</dt>
            <dd>{restaurant.menu}</dd>
          </div>

          <div>
            <dt>예상 예산</dt>
            <dd>{restaurant.price}</dd>
          </div>

          <div>
            <dt>이용 정보</dt>
            <dd>{restaurant.tags.join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <button className="restaurant-confirm-button" type="button" onClick={() => navigate(-1)}>
        이 가게로 정하기
      </button>
    </main>
  );
}

export default RestaurantDetailPage;
