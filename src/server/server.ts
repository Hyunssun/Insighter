import axios from "axios";

const instance = axios.create({
  timeout: 6000 * 5,
});

instance.defaults.baseURL = process.env.REACT_APP_API_URL;

// 데이터 받아오기
export const getDataAPI = () => {
  return instance.get("/data.json");
};
