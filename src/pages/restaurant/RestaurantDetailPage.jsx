import BackButton from "../../components/BackButton";

function RestaurantDetailPage({ restaurant, onBack, onConfirm }) {
  return (
    <div className="mobile-page restaurant-detail-page">
      <BackButton onClick={onBack} />

      {restaurant.image ? (
        <img
          className="restaurant-detail-image"
          src={restaurant.image}
          alt=""
        />
      ) : (
        <div className="restaurant-detail-image placeholder" />
      )}

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

      <button className="large-orange-button" type="button" onClick={onConfirm}>
        이 가게로 정하기
      </button>
    </div>
  );
}

export default RestaurantDetailPage;
