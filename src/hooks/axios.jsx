import Axios from "axios";

// axios interceptors for cookies
const axios = Axios.create({
  withCredentials: true,
  baseURL: window._env_.API_URL,
});

export default axios;
