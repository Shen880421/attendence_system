import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { attendanceAPI, employeeAPI } from "../services/api";
import {
    ClockIcon,
    UserIcon,
    ArrowRightOnRectangleIcon,
    ChartBarIcon,
    UsersIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [allRecords, setAllRecords] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // 'all', 'today', 'week'

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [recordsData, employeesData] = await Promise.all([
                attendanceAPI.getAllRecords(),
                employeeAPI.getAllEmployees(),
            ]);

            setAllRecords(recordsData);
            setEmployees(employeesData);
        } catch (error) {
            console.error("載入數據失敗:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterRecords = () => {
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        switch (filter) {
            case "today":
                return allRecords.filter(
                    (record) => new Date(record.timestamp) >= today
                );
            case "week":
                return allRecords.filter(
                    (record) => new Date(record.timestamp) >= weekAgo
                );
            default:
                return allRecords;
        }
    };

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const getEmployeeStats = () => {
        const filtered = filterRecords();
        const stats = {
            totalRecords: filtered.length,
            todayRecords: allRecords.filter(
                (record) =>
                    new Date(record.timestamp).toDateString() ===
                    new Date().toDateString()
            ).length,
            totalEmployees: employees.length,
            checkedInToday: new Set(
                allRecords
                    .filter(
                        (record) =>
                            new Date(record.timestamp).toDateString() ===
                                new Date().toDateString() &&
                            record.type === "clock_in"
                    )
                    .map((record) => record.employee.id)
            ).size,
        };
        return stats;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600"
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
                    <span className="text-lg text-gray-600">載入中...</span>
                </div>
            </div>
        );
    }

    const stats = getEmployeeStats();
    const filteredRecords = filterRecords();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 導航欄 */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <ChartBarIcon className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                管理控制台
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-700">
                                <UserIcon className="h-5 w-5 mr-2" />
                                <span>{user?.name}</span>
                                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                    {user?.role}
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                                <span className="text-sm">登出</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 主要內容 */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* 統計卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <UsersIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    總員工數
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalEmployees}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <ClockIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    今日打卡
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.todayRecords}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <UserIcon className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    今日出勤
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.checkedInToday}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <CalendarIcon className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    總記錄數
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalRecords}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 篩選和記錄表格 */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">
                                打卡記錄
                            </h2>
                            <div className="mt-4 sm:mt-0 flex space-x-2">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filter === "all"
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    全部
                                </button>
                                <button
                                    onClick={() => setFilter("today")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filter === "today"
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    今日
                                </button>
                                <button
                                    onClick={() => setFilter("week")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filter === "week"
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    本週
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        員工
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        類型
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        時間
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        地點
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredRecords.length > 0 ? (
                                    filteredRecords
                                        .sort(
                                            (a, b) =>
                                                new Date(b.timestamp) -
                                                new Date(a.timestamp)
                                        )
                                        .map((record, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                            <UserIcon className="h-5 w-5 text-gray-600" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {record.employee
                                                                    ?.name ||
                                                                    "未知員工"}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {record.employee
                                                                    ?.email ||
                                                                    ""}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            record.type ===
                                                            "clock_in"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {record.type ===
                                                        "clock_in"
                                                            ? "上班"
                                                            : "下班"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDateTime(
                                                        record.timestamp
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {record.location ||
                                                        "辦公室"}
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            <ClockIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                            <p>沒有找到打卡記錄</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
