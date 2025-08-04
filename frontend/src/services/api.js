import axios from "axios";

// 創建 axios 實例
const api = axios.create({
    baseURL: "http://127.0.0.1:8080/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// 請求攔截器 - 自動添加 JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 響應攔截器 - 處理 token 過期
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token 過期，清除本地存儲並重定向到登入頁面
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// 認證相關 API
export const authAPI = {
    // 登入
    login: async (email, password) => {
        const response = await api.post("/employees/login", {
            email,
            password,
        });
        return response.data;
    },

    // 創建用戶（註冊）
    register: async (userData) => {
        const response = await api.post("/employees/createuser", userData);
        return response.data;
    },
};

// 打卡相關 API
export const attendanceAPI = {
    // 獲取打卡狀態
    getStatus: async () => {
        const response = await api.get("/attendance/status");
        return response.data;
    },

    // 上班打卡
    checkIn: async (location = "辦公室") => {
        const response = await api.post("/attendance/checkin", { location });
        return response.data;
    },

    // 下班打卡
    checkOut: async (location = "辦公室") => {
        const response = await api.post("/attendance/checkout", { location });
        return response.data;
    },

    // 獲取所有打卡記錄
    getAllRecords: async () => {
        const response = await api.get("/attendance/getall");
        return response.data;
    },
};

// 員工相關 API
export const employeeAPI = {
    // 獲取所有員工
    getAllEmployees: async () => {
        const response = await api.get("/employees/getall");
        return response.data;
    },
};

export default api;
