import axios from "axios";

const url = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: url,
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    },
});

const privateAxios = axios.create({
    baseURL: url,
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    },
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.clear()
       window.location.href = "/auth"
    }
    config.headers.Authorization = `Bearer ${token}`; 
    return config;
  },
  (error) => {
    console.error( error);
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { api, privateAxios };
