import api from "./client";

export const getRestaurants = (params) => {
  return api.get("/v1/restaurants", { params });
};

export const getRestaurant = (restaurantId) => {
  return api.get(`/v1/restaurants/${restaurantId}`);
};

export const getRestaurantRecommendations = (params) => {
  return api.get("/v1/restaurants/recommendations", { params });
};
