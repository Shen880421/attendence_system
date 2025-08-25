import { useDispatch, useSelector } from "react-redux";
import {
    setAuth,
    clearAuth,
    initAuth,
    setLoading,
    updateUser,
    selectAuth,
    selectUser,
    selectToken,
    selectIsAuthenticated,
    selectAuthLoading,
} from "./authSlice";

// 自定義 hooks 提供更簡潔的 API
export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);

    // 登入函數
    const login = (tokenData, userData) => {
        dispatch(setAuth({ user: userData, token: tokenData }));
    };

    // 登出函數
    const logout = () => {
        dispatch(clearAuth());
    };

    // 初始化認證狀態
    const initialize = () => {
        dispatch(initAuth());
    };

    // 設置載入狀態
    const setAuthLoading = (loadingState) => {
        dispatch(setLoading(loadingState));
    };

    // 更新使用者資訊
    const updateUserInfo = (userData) => {
        dispatch(updateUser(userData));
    };

    return {
        // 狀態
        user,
        token,
        isAuthenticated,
        loading,
        auth,

        // 動作
        login,
        logout,
        initialize,
        setLoading: setAuthLoading,
        updateUser: updateUserInfo,
    };
};

// 快速存取認證狀態的 hooks
export const useUser = () => useSelector(selectUser);
export const useToken = () => useSelector(selectToken);
export const useIsAuthenticated = () => useSelector(selectIsAuthenticated);
export const useAuthLoading = () => useSelector(selectAuthLoading);
