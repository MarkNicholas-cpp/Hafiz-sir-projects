import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://192.168.0.105:3000/",
    headers: {
        "Content-Type": "application/json",
    }
});
apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})
export default apiInstance;
