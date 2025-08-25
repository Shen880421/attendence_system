import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { initAuth } from "./store/authSlice";
import ProtectedRoute, { PublicRoute } from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./style.css";

function App() {
    const dispatch = useDispatch();

    // 初始化認證狀態（只在組件掛載時執行一次）
    useEffect(() => {
        dispatch(initAuth());
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* 公開路由 - 已登入用戶會被重定向到 dashboard */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />

                    {/* 受保護的路由 - 需要登入 */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* 根路徑重定向 */}
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    {/* 404 頁面 */}
                    <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
