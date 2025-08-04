import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import {
    EyeIcon,
    EyeSlashIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "EMPLOYEE",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // 清除錯誤訊息
        if (error) setError("");
        if (success) setSuccess("");
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("請輸入姓名");
            return false;
        }
        if (!formData.email.trim()) {
            setError("請輸入電子信箱");
            return false;
        }
        if (!formData.password) {
            setError("請輸入密碼");
            return false;
        }
        if (formData.password.length < 6) {
            setError("密碼至少需要6個字符");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("確認密碼不匹配");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            const userData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                role: formData.role,
            };

            await authAPI.register(userData);
            setSuccess("帳號創建成功！即將跳轉到登入頁面...");

            // 2秒後跳轉到登入頁面
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data || "註冊失敗，請稍後再試");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* 標題 */}
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <UserPlusIcon className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            創建新帳號
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            填寫以下資訊來註冊
                        </p>
                    </div>

                    {/* 表單 */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                                {success}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* 姓名輸入 */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    姓名
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="請輸入您的姓名"
                                />
                            </div>

                            {/* Email 輸入 */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    電子信箱
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="請輸入您的電子信箱"
                                />
                            </div>

                            {/* 角色選擇 */}
                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    角色
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                >
                                    <option value="EMPLOYEE">員工</option>
                                    <option value="MANAGER">經理</option>
                                    <option value="ADMIN">管理員</option>
                                </select>
                            </div>

                            {/* 密碼輸入 */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    密碼
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="請輸入密碼（至少6個字符）"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* 確認密碼輸入 */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    確認密碼
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="請再次輸入密碼"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 註冊按鈕 */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading || success}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        註冊中...
                                    </div>
                                ) : success ? (
                                    "註冊成功"
                                ) : (
                                    "創建帳號"
                                )}
                            </button>
                        </div>

                        {/* 登入連結 */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                                已有帳號？點此登入
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
