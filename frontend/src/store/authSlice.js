import { createSlice } from "@reduxjs/toolkit";

// 初始狀態
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
};

// 創建 auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // 設置認證狀態
        setAuth: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = !!(user && token);
            state.loading = false;

            // 儲存到 localStorage
            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            }
        },

        // 清除認證狀態
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;

            // 從 localStorage 移除
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },

        // 初始化認證狀態（從 localStorage 讀取）
        initAuth: (state) => {
            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (savedToken && savedUser) {
                try {
                    state.user = JSON.parse(savedUser);
                    state.token = savedToken;
                    state.isAuthenticated = true;
                } catch (error) {
                    console.error("Failed to parse saved user data:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }

            state.loading = false;
        },

        // 設置載入狀態
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // 更新使用者資訊
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
});

// 導出 actions
export const { setAuth, clearAuth, initAuth, setLoading, updateUser } =
    authSlice.actions;

// 選擇器（Selectors）
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;

// 導出 reducer
export default authSlice.reducer;
