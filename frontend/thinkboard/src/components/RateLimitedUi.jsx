import React from "react";
import { Zap, Clock, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

const RateLimitedUi = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-amber-50 rounded-full mb-4">
              <Zap className="w-12 h-12 text-amber-500" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Whoa, Slow Down!
            </h1>
            <p className="text-gray-600 mb-6">
              You've hit our rate limit. Please wait a moment before trying
              again.
            </p>

            <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg mb-6 w-full justify-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Rate limit resets in approximately 1 minute</span>
            </div>

            <div className="w-full">
              <button
                onClick={handleRefresh}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            Need help? Contact our support team at support@thinkerboard.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUi;
