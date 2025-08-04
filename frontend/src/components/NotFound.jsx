import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                    </div>

                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        頁面不存在
                    </h2>
                    <p className="text-gray-600 mb-8">
                        抱歉，您訪問的頁面不存在或已被移除。
                    </p>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <HomeIcon className="h-5 w-5 mr-2" />
                        返回首頁
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
