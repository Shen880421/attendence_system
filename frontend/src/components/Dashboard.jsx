import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { attendanceAPI } from "../services/api";
import AdminDashboard from "./AdminDashboard";
import {
  ClockIcon,
  MapPinIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [records, setRecords] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState({
    canCheckIn: true,
    canCheckOut: false,
    todayRecords: [],
  });

  // 更新當前時間
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 載入打卡記錄
  useEffect(() => {
    loadAttendanceData();
  }, []);
  // 如果是管理員，顯示管理面板
  if (user?.role === "ADMIN") {
    return <AdminDashboard />;
  }
  const loadAttendanceData = async () => {
    try {
      const recordsData = await attendanceAPI.getAllRecords();

      // 只顯示當前用戶的記錄，並按時間倒序排列
      const userRecords = recordsData
        .filter((record) => record.employee.id === user.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5); // 只顯示最近 5 筆記錄
      setRecords(userRecords);

      // 嘗試獲取狀態，如果失敗則使用默認值
      try {
        const statusData = await attendanceAPI.getStatus();
        setAttendanceStatus(statusData);
      } catch (statusError) {
        console.warn("無法獲取打卡狀態，使用默認值:", statusError);
        // 基於現有記錄計算狀態
        const todayRecords = userRecords.filter((record) => {
          const recordDate = new Date(record.timestamp);
          const today = new Date();
          return recordDate.toDateString() === today.toDateString();
        });

        let canCheckIn = true;
        let canCheckOut = false;

        if (todayRecords.length > 0) {
          const lastRecord = todayRecords[0];
          canCheckIn = lastRecord.type === "clock_out";
          canCheckOut = lastRecord.type === "clock_in";
        }

        setAttendanceStatus({
          canCheckIn,
          canCheckOut,
          todayRecords,
        });
      }
    } catch (error) {
      console.error("載入打卡數據失敗:", error);
      // 如果完全無法載入，設置默認狀態
      setAttendanceStatus({
        canCheckIn: true,
        canCheckOut: false,
        todayRecords: [],
      });
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await attendanceAPI.checkIn("辦公室");
      showMessage("上班打卡成功！", "success");
      loadAttendanceData(); // 重新載入記錄和狀態
    } catch (error) {
      showMessage(error.response?.data || "打卡失敗，請稍後再試", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await attendanceAPI.checkOut("辦公室");
      showMessage("下班打卡成功！", "success");
      loadAttendanceData(); // 重新載入記錄和狀態
    } catch (error) {
      showMessage(error.response?.data || "打卡失敗，請稍後再試", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("zh-TW", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
    });
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 導航欄 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                打卡系統
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <UserIcon className="h-5 w-5 mr-2" />
                <span>{user?.name}</span>
                <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
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
        {/* 訊息提示 */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              messageType === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircleIcon className="h-5 w-5 mr-2" />
            ) : (
              <XCircleIcon className="h-5 w-5 mr-2" />
            )}
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 時間顯示和打卡按鈕 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 當前時間 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {formatTime(currentTime)}
                </div>
                <div className="text-lg text-gray-600">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>

            {/* 打卡按鈕 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                打卡功能
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleCheckIn}
                  disabled={loading || !attendanceStatus.canCheckIn}
                  className={`flex items-center justify-center py-4 px-6 font-medium rounded-lg transition-colors ${
                    attendanceStatus.canCheckIn && !loading
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <ClockIcon className="h-6 w-6 mr-2" />
                  {loading ? "處理中..." : "上班打卡"}
                </button>

                <button
                  onClick={handleCheckOut}
                  disabled={loading || !attendanceStatus.canCheckOut}
                  className={`flex items-center justify-center py-4 px-6 font-medium rounded-lg transition-colors ${
                    attendanceStatus.canCheckOut && !loading
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <ClockIcon className="h-6 w-6 mr-2" />
                  {loading ? "處理中..." : "下班打卡"}
                </button>
              </div>

              {/* 狀態提示 */}
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">
                  {attendanceStatus.canCheckIn &&
                    !attendanceStatus.canCheckOut && (
                      <span className="text-blue-600">💡 您可以打上班卡</span>
                    )}
                  {!attendanceStatus.canCheckIn &&
                    attendanceStatus.canCheckOut && (
                      <span className="text-orange-600">
                        💡 您已打上班卡，可以打下班卡
                      </span>
                    )}
                  {!attendanceStatus.canCheckIn &&
                    !attendanceStatus.canCheckOut && (
                      <span className="text-green-600">✅ 今日打卡已完成</span>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* 最近打卡記錄 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              最近打卡記錄
            </h2>
            <div className="space-y-4">
              {records.length > 0 ? (
                records.map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          record.type === "clock_in"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {record.type === "clock_in" ? "上班" : "下班"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDateTime(record.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {record.location}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <ClockIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>尚無打卡記錄</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
