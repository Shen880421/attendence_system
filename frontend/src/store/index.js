import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// 創建 Redux store
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // 開發環境啟用 Redux DevTools
    devTools: process.env.NODE_ENV !== "production",

    // 中間件配置
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // 忽略這些 action types 的序列化檢查
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

// 導出 store
export default store;
