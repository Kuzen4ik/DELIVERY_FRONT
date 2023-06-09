import axios from "../utils/axios";

// SHOPS

export const getShopsAPI = async () => axios.get("/api/shops");

export const postShopsAPI = async (data) => axios.post("/api/shops", data);

export const deleteShopsAPI = async (shopId) =>
  axios.delete(`/api/shops/${shopId}`);

// MENU

export const postMenuAPI = async (shopId, sendData) =>
  axios.post(`/api/menu/${shopId}`, sendData);

export const getMenuByShopIdAPI = async (shopId) =>
  axios.get(`/api/menu/${shopId}`);

export const deleteMenuAPI = async (menuId) =>
  axios.delete(`/api/menu/${menuId}`);

// ORDERS

export const postOrdersAPI = async (sendData) =>
  axios.post("/api/orders", sendData);

export const getOrdersAPI = async (sendData) => {
  let url = "/api/orders?";

  if (sendData?.email) {
    url += `email=${sendData.email}&`;
  }
  if (sendData?.phone) {
    url += `phone=${sendData.phone}`;
  }
  return axios.get(url);
};

// COUPONS

export const getCouponsAPI = async (code) => {
  let url = "/api/coupons/?";
  if (code) {
    url += `code=${code}`;
  }

  return axios.get(url);
};

export const postCouponsAPI = async (sendData) =>
  axios.post("/api/coupons", sendData);

export const deleteCouponsAPI = async (code) =>
  axios.delete(`/api/coupons/${code}`);

// AUTH

export const postAuthRegisterAPI = async (sendData) =>
  axios.post("/api/auth/register", sendData);

export const postAuthLoginAPI = async (sendData) =>
  axios.post("/api/auth/login", sendData);
